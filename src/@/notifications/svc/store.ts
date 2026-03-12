import { collection, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { get } from './get'
import type { Notification } from './net'

export const notifications = collection<Notification>({
  get,
  bind: account,
  persist: 'notifications',
  stale: true,
  values: values<Notification>(),
})

events.on('default.notifications.sync', (notification) => sync(notifications, notification))
