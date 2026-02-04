import { account } from '@/iam'
import * as net from '../../net'
import { create, extractKeys, get } from './subscription'
import type { Channel } from '../interface'

async function send(): Promise<void | Error> {
  const me = account.extract()

  if (me === null) return

  const subscription = await get()

  if (subscription === null) return

  const keys = extractKeys(subscription)

  if (keys instanceof Error) return keys

  const result = await net.subscribe(me.id, {
    channel: 'web',
    endpoint: { endpoint: subscription.endpoint, keys },
  })

  if (result instanceof Error) return result
}

export const web: Channel = {
  init() { },

  async permission(): Promise<NotificationPermission | null> {
    if (typeof Notification === 'undefined') return null

    return Notification.permission
  },

  async request(): Promise<NotificationPermission> {
    return Notification.requestPermission()
  },

  async subscribe(): Promise<void | Error> {
    if ((await this.permission()) === 'default')
      if ((await this.request()) !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    const subscription = (await get(registration)) ?? (await create(registration))

    if (subscription instanceof Error) return subscription

    return send()
  },

  async unsubscribe(): Promise<void> {
    const subscription = await get()

    await subscription?.unsubscribe()
  },

  async isSubscribed(): Promise<boolean> {
    return (await get()) !== null
  },
}
