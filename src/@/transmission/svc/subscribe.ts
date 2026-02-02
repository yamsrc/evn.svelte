import { browser } from '$app/environment'
import { account } from '@/iam'
import * as net from './net'
import { getPermission } from './permission'
import { permission, subscribed } from './store'
import { get, create, extractKeys } from './subscription'

async function send(subscription: PushSubscription): Promise<void | Error> {
  const me = account.extract()

  if (me === null) return

  const keys = extractKeys(subscription)

  if (keys instanceof Error) return keys

  const result = await net.subscribe(me.id, {
    channel: 'web',
    endpoint: {
      endpoint: subscription.endpoint,
      keys,
    },
  })

  if (result instanceof Error) return result
}

/** Requests notification permission, gets or creates push subscription, and registers it with the backend. */
export async function subscribe(): Promise<void | Error> {
  if (!browser) return

  if (getPermission() === 'default' &&
    (await Notification.requestPermission()) !== 'granted') return

  const registration = await navigator.serviceWorker.ready
  const subscription = (await get(registration)) ?? (await create(registration))

  if (subscription instanceof Error) return subscription

  return send(subscription)
}

/** Calls subscribe and updates permission/subscribed store state. */
export async function request(): Promise<void> {
  await subscribe()
  permission.set(getPermission())
  subscribed.set((await get()) !== null)
}
