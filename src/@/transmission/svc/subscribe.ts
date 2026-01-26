import { browser } from '$app/environment'
import { VAPID_PUBLIC_KEY } from '$config'
import { base64urlToUint8Array } from '$lib/tools/convert'
import { account } from '@/iam'
import * as net from './net'

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''

  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i])

  return btoa(binary)
}

async function createBrowserSubscription(
  registration: ServiceWorkerRegistration,
): Promise<PushSubscription | Error> {
  if (typeof VAPID_PUBLIC_KEY !== 'string' || VAPID_PUBLIC_KEY === '')
    return new Error('VAPID public key not configured')

  try {
    const existing = await registration.pushManager.getSubscription()

    if (existing !== null && existing !== undefined)
      return existing

    const applicationServerKey = base64urlToUint8Array(VAPID_PUBLIC_KEY) as BufferSource

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    })

    return subscription
  } catch (error) {
    return error instanceof Error ? error : new Error('Failed to create push subscription')
  }
}

async function registerWithBackend(
  accountId: string,
  subscription: PushSubscription,
): Promise<string | Error> {
  const endpoint = subscription.endpoint
  const p256dh = subscription.getKey('p256dh')
  const auth = subscription.getKey('auth')

  if (p256dh === null || auth === null)
    return new Error('Subscription keys missing')

  const body: net.SubscribeInput = {
    channel: 'web',
    endpoint: {
      endpoint,
      keys: {
        p256dh: arrayBufferToBase64(p256dh),
        auth: arrayBufferToBase64(auth),
      },
    },
  }

  const result = await net.subscribe(accountId, body)

  if (result instanceof Error) return result

  return result.id
}

export async function subscribe(): Promise<string | Error | void> {
  if (!browser) return

  const me = account.extract()

  if (me === null || me === undefined)
    return new Error('Not authenticated')

  if (!('Notification' in window))
    return new Error('Notifications not supported')

  if (Notification.permission === 'denied')
    return new Error('Notification permission denied')

  if (Notification.permission === 'default') {
    const result = await Notification.requestPermission()

    if (result !== 'granted')
      return new Error('Notification permission denied')
  }

  const registration = await navigator.serviceWorker.ready

  const subscription = await createBrowserSubscription(registration)

  if (subscription instanceof Error)
    return subscription

  return registerWithBackend(me.id, subscription)
}
