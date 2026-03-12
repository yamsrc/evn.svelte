import { derived } from 'svelte/store'
import { collection, ok, sync, values } from 'svas'
import { events } from '@/realtime'
import { notifications } from '@/notifications'
import { account } from '@/iam'
import { contacts } from '@/contacts'
import { sort } from './unseen'
import { get } from './get'
import { balance } from './balance'
import type { Readable } from 'svelte/store'
import type { Contact } from '@/contacts'
import type { Account } from '@/accounts'
import type * as net from './net'

export interface Group extends net.Group {
  balance: number
  title: string
  emoji?: string
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

export const groups: Readable<Group[]> = derived([internal, contacts, account, notifications], ([$groups, $contacts, $account, $notifications]) => {
  if (!ok($groups) || !ok($contacts) || !ok($account)) return []

  return $groups
    .map((group) => map(group, $contacts, $account))
    .sort(sort(ok($notifications) ? $notifications : []))
})

function map(group: net.Group, contacts: Contact[], account: Account): Group {
  // extract first emoji from the group name
  const { emoji, label } = extractEmoji(group.name)

  return {
    ...group,
    title: label,
    emoji,
    balance: balance(group, contacts, account),
  }
}

function extractEmoji(name: string): { emoji: string | undefined, label: string } {
  const emoji = name.match(/\p{Extended_Pictographic}/u)?.[0]

  return { emoji, label: emoji === undefined ? name : name.replace(emoji, '').trim() }
}
