import { shell } from '@/shell'
import { mapPermission } from '../permission'
import type { Channel } from '../Channel'
import type { SubscribeInput } from '../../net'

let initialized = false

function init(): void {
  if (initialized) return

  initialized = true

  shell.transmission.onNotificationClick((n) => {
    if (n.action !== undefined && n.action !== '')
      window.location.href = n.action
  })

  shell.transmission.onNotification((n) => {
    console.debug('notification', n)
  })
}

export const bridge: Channel = {
  name: 'fcm',

  async available(): Promise<boolean> {
    if (!shell.available()) return false

    init()

    return true
  },

  async permission(): Promise<NotificationPermission | null> {
    const s = await shell.transmission.permission()

    if (s instanceof Error) return null

    return mapPermission(s)
  },

  async request(): Promise<NotificationPermission | null> {
    const s = await shell.transmission.request()

    if (s instanceof Error) return null

    return mapPermission(s)
  },

  async subscribe(): Promise<SubscribeInput | Error> {
    const token = await shell.transmission.address()

    if (token instanceof Error) return token

    return { channel: 'fcm', endpoint: token }
  },

  async unsubscribe(): Promise<void> {
    shell.transmission.delete()
  },

  async subscribed(): Promise<boolean> {
    return false
  },
}
