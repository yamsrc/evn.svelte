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
  init() {},

  getPermission() {
    if (typeof Notification === 'undefined') return null

    return Notification.permission
  },

  async subscribe() {
    if (this.getPermission() === 'default')
      if ((await Notification.requestPermission()) !== 'granted') return

    const registration = await navigator.serviceWorker.ready
    const subscription = (await get(registration)) ?? (await create(registration))

    if (subscription instanceof Error) return subscription

    return send()
  },

  async unsubscribe() {
    const subscription = await get()

    await subscription?.unsubscribe()
  },

  async isSubscribed() {
    return (await get()) !== null
  },
}
