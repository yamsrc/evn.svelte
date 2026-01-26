import { arrayBufferToBase64 } from '$lib/tools/convert'
import { getVapidKey } from './vapid'

export async function getOrCreate(
  registration: ServiceWorkerRegistration,
): Promise<PushSubscription | Error> {
  const vapidKey = getVapidKey()

  if (vapidKey instanceof Error) return vapidKey

  const existing = await registration.pushManager.getSubscription()

  if (existing !== null) return existing

  try {
    return await registration.pushManager.subscribe({ applicationServerKey: vapidKey })
  } catch (error) {
    return error instanceof Error ? error : new Error('Failed to create push subscription')
  }
}

export function extractKeys(subscription: PushSubscription): {
  p256dh: string
  auth: string
} | Error {
  const p256dh = subscription.getKey('p256dh')
  const auth = subscription.getKey('auth')

  if (p256dh === null || auth === null) return new Error('Subscription keys missing')

  return {
    p256dh: arrayBufferToBase64(p256dh),
    auth: arrayBufferToBase64(auth),
  }
}
