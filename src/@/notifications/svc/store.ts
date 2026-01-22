import { collection, sync, values } from 'svas'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type { Notification } from './net'

export const notifications = collection<Notification>({
  get,
  bind: account,
  values: values<Notification>(),
})

events.on('default.notifications.sync', (notification) => sync(notifications, notification))
