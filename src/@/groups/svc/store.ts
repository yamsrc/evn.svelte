import { collection, ok, sync, values } from 'svas'
import { derived } from 'svelte/store'
import { contacts } from '@/contacts'
import { account } from '@/iam'
import { notifications } from '@/notifications'
import { events } from '@/realtime'
import { balance } from './balance'
import { get } from './get'
import type * as net from './net'
import type { Notification } from '@/notifications'
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

events.on('default.groups.sync', (entry: net.Group) => sync(internal, entry))
events.on('default.groups.quit', (group: net.Group) => internal.delete(group.id))

const unseen = (group: Group, notifications: Notification[]) => {
  return notifications.some((n) => n.domain === 'groups' && n.key === group.id)
}

export const groups: Readable<Group[]> = derived([internal, contacts, account, notifications], ([$groups, $contacts, $account, $notifications]) => {
  if (!ok($groups) || !ok($contacts) || !ok($account)) return []

  return $groups
    .map((group) => ({
      ...group,
      balance: balance(group, $contacts, $account),
    }))
    .sort((lhs, rhs) => {
      if (!ok($notifications)) return 0

      return Number(unseen(rhs, $notifications)) - Number(unseen(lhs, $notifications))
    })
})
