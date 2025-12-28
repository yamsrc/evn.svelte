import { collection, ok, sync, type Maybe } from 'svas'
import { values } from 'svas'
import { derived } from 'svelte/store'
import { accounts } from '@/account'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import { map } from './map'
import type { Contact } from './Contact'

export const internal = collection({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
  values: values<Contact>(),
})

events.on('default.contacts.sync', (contact) => sync(internal, contact))

export const contacts = derived<[typeof internal, typeof account], Maybe<Contact[]>>([internal, account], ([$contacts, $account], set, update) => {
  if (!ok($contacts))
    return set($contacts)

  if (!ok($account))
    return set($account)

  const values = $contacts.map((contact) => map(contact, $account.id))

  set(values)

  const unsubs = values.map((contact) =>
    accounts.get(contact.identity).subscribe((account) => update((values) => {
      if (!ok(values) || !ok(account))
        return values

      const i = values.findIndex((value) => value.identity === account.id)

      values[i] = { ...values[i], account }

      return values
    })))

  return () => unsubs.forEach((unsub) => unsub())
})
