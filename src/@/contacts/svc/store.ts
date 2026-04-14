import { derived } from 'svelte/store'
import { collection, ok, sync, type Maybe } from 'svas'
import { values } from 'svas'
import { events } from '@/realtime'
import { notifications } from '@/notifications'
import { account } from '@/iam'
import { accounts } from '@/accounts'
import { sort } from './unseen'
import { map } from './map'
import { get } from './get'
import type { Contact } from './Contact'

export const internal = collection({
  get,
  persist: 'contacts',
  bind: account,
  stale: true,
  values: values<Contact>(),
})

events.on('default.contacts.sync', (contact) => sync(internal, contact))

export const contacts = derived<[typeof internal, typeof account, typeof notifications], Maybe<Contact[]>>([internal, account, notifications], ([$contacts, $me, $notifications], set, update) => {
  if (!ok($contacts))
    return set($contacts)

  if (!ok($me))
    return set($me)

  const values = $contacts
    .map((contact) => map(contact, $me.id))
    .sort(sort(ok($notifications) ? $notifications : []))

  set(values)

  const unsubs = values.map((contact) =>
    accounts.get(contact.identity).subscribe((account) => update((values) => {
      if (!ok(values) || !ok(account))
        return values

      const i = values.findIndex((value) => value.identity === account.id)

      if (i < 0 || values[i] === undefined)
        return values

      const managed = account.overlord === $me.id

      values[i] = { ...values[i], account, managed }

      return values
    })))

  return () => unsubs.forEach((unsub) => unsub())
})
