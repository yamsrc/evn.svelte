import { writable } from 'svelte/store'
import { get as extract } from 'svelte/store'
import { collection, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { get } from './get'
import { del } from './del'
import type { Scope } from '@/transmission'
import type { Notification } from './net'

export const notifications = collection<Notification>({
  get,
  bind: account,
  persist: 'notifications',
  stale: true,
  values: values<Notification>(),
})

export const looking = writable<Scope | null>(null)

events.on('default.notifications.sync', (notification) => {
  const unseen = notification._deleted === null || notification._deleted === undefined
  const scope = extract(looking)
  const matching = scope !== null && notification.domain === scope.domain && notification.key === scope.key

  if (unseen && matching)
    void del(notification.id)
  else
    sync(notifications, notification)
})
