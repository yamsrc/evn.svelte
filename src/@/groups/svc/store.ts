import { collection, ok, values } from 'svas'
import { derived } from 'svelte/store'
import { contacts } from '@/contacts'
import { account } from '@/iam'
import { balance } from './balance'
import { get } from './get'
import type * as net from './net'
import type { Readable } from 'svelte/store'

export interface Group extends net.Group {
  balance: number
}

export const internal = collection<net.Group>({
  get,
  persist: 'groups',
  bind: account,
  stale: true,
  values: values<Group>(),
})

export const groups: Readable<Group[]> = derived([internal, contacts, account], ([$groups, $contacts, $account]) => {
  if (!ok($groups) || !ok($contacts) || !ok($account)) return []

  return $groups.map((group) => ({
    ...group,
    balance: balance(group, $contacts, $account),
  }))
})
