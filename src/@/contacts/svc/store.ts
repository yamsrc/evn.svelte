import { collection } from 'svas'
import { derived } from 'svelte/store'
import { type Readable } from 'svelte/store'
import { account } from '@/iam'
import { get } from './get'
import type { Contact } from './Contact'
import type * as net from './net'

const internal = collection<net.Contact>({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
})

export const contacts: Readable<Contact[]> = derived([internal, account], ([$internal, $account]) => {
  if ($internal instanceof Error || $internal === null) return []

  return $internal.map((contact): Contact => {
    const identity = contact.identities.find((identity) => identity !== $account?.id)!
    const balance = contact.identities[0] === $account?.id ? -contact.balance : contact.balance

    return { ...contact, balance, identity }
  })
})
