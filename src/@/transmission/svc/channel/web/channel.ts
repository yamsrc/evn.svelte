import { create, extractKeys, get } from './subscription'
import type { Channel } from '../Channel'
import type { SubscribeInput } from '../../net'

export const web: Channel = {
  async available(): Promise<boolean> {
    return typeof Notification !== 'undefined'
  },

  async permission(): Promise<NotificationPermission | null> {
    if (typeof Notification === 'undefined') return null

    return Notification.permission
  },

  async request(): Promise<NotificationPermission> {
    return Notification.requestPermission()
  },

  async subscribe(): Promise<SubscribeInput | Error> {
    if ((await this.permission()) === 'default')
      if ((await this.request()) !== 'granted') return new Error('Permission denied')

    const registration = await navigator.serviceWorker.ready
    const subscription = (await get(registration)) ?? (await create(registration))

    if (subscription instanceof Error) return subscription

    const keys = extractKeys(subscription)

    if (keys instanceof Error) return keys

    return { channel: 'web', endpoint: { endpoint: subscription.endpoint, keys } }
  },

  async unsubscribe(): Promise<void> {
    const subscription = await get()

    await subscription?.unsubscribe()
  },

  async subscribed(): Promise<boolean> {
    return false
  },
}
