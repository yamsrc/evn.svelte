import { collection, sync } from 'svas'
import { values } from 'svas'
import { derived } from 'svelte/store'
import { type Readable } from 'svelte/store'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import { map } from './map'
import type { Contact } from './Contact'
import type * as net from './net'

export const internal = collection<Contact>({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
  values: values<Contact>(),
})

events.on('default.contacts.sync', async (entry: net.Contact) => {
  const contact = await map(entry)

  if (contact instanceof Error)
    return

  sync(internal, contact)
})

export const contacts: Readable<Contact[]> = derived([internal, account], ([$internal, $account]) => {
  if ($internal instanceof Error || $internal === null) return []

  return $internal.map((contact): Contact => {
    const i = contact.identities
    const identity = $account?.id === i[0] ? i[1] : i[0]
    const balance = $account?.id === i[0] ? -contact.balance : contact.balance

    return { ...contact, balance, identity }
  })
})
