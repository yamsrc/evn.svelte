import { browser } from '$app/environment'
import { VAPID_PUBLIC_KEY } from '$config'
import { account } from '@/iam'
import * as net from './net'
import { addSubscription, clearSubscriptions, getSubscriptionIds } from './store'

const BROADCAST_CHANNEL = 'push-subscription-coordination'
const SW_PATH = '/sw.js'

let broadcastChannel: BroadcastChannel | null = null
let isSubscribing = false

function getBroadcastChannel(): BroadcastChannel | null {
  if (!browser || typeof BroadcastChannel === 'undefined') return null

  if (broadcastChannel === null)
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL)

  return broadcastChannel
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''

  for (let i = 0; i < bytes.length; i++)
    binary += String.fromCharCode(bytes[i])

  return btoa(binary)
}

async function registerServiceWorker(): Promise<ServiceWorkerRegistration | Error> {
  if (!browser || !('serviceWorker' in navigator))
    return new Error('Service workers not supported')

  try {
    let registration = await navigator.serviceWorker.getRegistration(SW_PATH)

    if (registration === null || registration === undefined || registration.active === null) {
      registration = await navigator.serviceWorker.register(SW_PATH)

      // Wait for activation
      await new Promise<void>((resolve) => {
        if (registration?.installing !== null && registration?.installing !== undefined)
          registration.installing.addEventListener('statechange', () => {
            if (registration?.installing?.state === 'activated')
              resolve()
          })
        else
          resolve()
      })
    }

    if (registration === null || registration === undefined)
      return new Error('Service worker registration failed')

    return registration
  } catch (error) {
    return error instanceof Error ? error : new Error('Service worker registration failed')
  }
}

async function createBrowserSubscription(
  registration: ServiceWorkerRegistration,
): Promise<PushSubscription | Error> {
  if (typeof VAPID_PUBLIC_KEY !== 'string' || VAPID_PUBLIC_KEY === '')
    return new Error('VAPID public key not configured')

  try {
    // Convert VAPID key from URL-safe base64 to Uint8Array
    const padding = '='.repeat((4 - (VAPID_PUBLIC_KEY.length % 4)) % 4)
    const base64 = (VAPID_PUBLIC_KEY + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const vapidKey = new Uint8Array([...rawData].map((char) => char.charCodeAt(0)))

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidKey,
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

async function retryBackendRegistration(
  accountId: string,
  subscription: PushSubscription,
): Promise<void> {
  const maxRetries = 5
  const retryDelay = 5000 // 5 seconds

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    if (attempt > 0)
      await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt))

    const result = await registerWithBackend(accountId, subscription)

    if (!(result instanceof Error)) {
      addSubscription(result)

      return
    }

    // Check if we're still online
    if (!navigator.onLine) {
      // Queue for retry when online
      window.addEventListener('online', () => {
        void retryBackendRegistration(accountId, subscription)
      }, { once: true })

      return
    }
  }

  // Failed after max retries - subscription will be retried on next subscribe attempt
  console.warn('Failed to register subscription with backend after retries')
}

async function performSubscribe(accountId: string): Promise<void | Error> {
  if (isSubscribing)
    return // Another tab is already subscribing

  isSubscribing = true

  try {
    // Check notification permission
    if (!('Notification' in window))
      return new Error('Notifications not supported')

    const permission = Notification.permission

    if (permission === 'denied') {
      // Proactively delete backend subscriptions
      const ids = getSubscriptionIds()

      if (ids.length > 0)
        await net.unsubscribe(accountId, { ids })

      return new Error('Notification permission denied')
    }

    // Request permission if needed
    if (permission === 'default') {
      const result = await Notification.requestPermission()

      if (result === 'denied') {
        const ids = getSubscriptionIds()

        if (ids.length > 0)
          await net.unsubscribe(accountId, { ids })

        return new Error('Notification permission denied')
      }
    }

    // Register service worker
    const registration = await registerServiceWorker()

    if (registration instanceof Error)
      return registration

    // Create browser subscription
    const subscription = await createBrowserSubscription(registration)

    if (subscription instanceof Error)
      return subscription

    // Register with backend
    const subscriptionId = await registerWithBackend(accountId, subscription)

    if (subscriptionId instanceof Error) {
      // If backend registration fails, persist locally and retry
      await retryBackendRegistration(accountId, subscription)

      return subscriptionId
    }

    addSubscription(subscriptionId)

    // Notify other tabs via BroadcastChannel
    const channel = getBroadcastChannel()

    if (channel !== null)
      channel.postMessage({ type: 'subscription-created', id: subscriptionId })
  } finally {
    isSubscribing = false
  }
}

export async function subscribe(): Promise<void | Error> {
  if (!browser) return

  const me = account.extract()

  if (me === null || me === undefined)
    return new Error('Not authenticated')

  // Check if already subscribed
  const existingIds = getSubscriptionIds()

  if (existingIds.length > 0) {
    // Check if subscription is still valid by trying to get service worker registration
    const registration = await navigator.serviceWorker.getRegistration(SW_PATH)

    if (registration !== null && registration !== undefined) {
      const subscription = await registration.pushManager.getSubscription()

      if (subscription !== null && subscription !== undefined)
        return // Already subscribed
    }
  }

  // Coordinate with other tabs via BroadcastChannel
  // Only one tab should subscribe, others should wait and reuse the subscription
  const channel = getBroadcastChannel()

  if (channel !== null)
    return new Promise((resolve) => {
      let resolved = false

      const resolveOnce = (value: void | Error) => {
        if (!resolved) {
          resolved = true
          channel.removeEventListener('message', handler)
          resolve(value)
        }
      }

      const timeout = setTimeout(() => {
        // No response from other tabs, proceed with subscription
        void performSubscribe(me.id).then(resolveOnce)
      }, 200)

      const handler = (event: MessageEvent) => {
        if (event.data?.type === 'subscription-created') {
          // Another tab successfully created subscription
          clearTimeout(timeout)
          resolveOnce(undefined)
        } else if (event.data?.type === 'subscription-request')
          // Another tab is requesting subscription
          // If we're not already subscribing, let the other tab proceed
          if (!isSubscribing) {
            clearTimeout(timeout)
            resolveOnce(undefined)
          }
      }

      channel.addEventListener('message', handler)

      // Announce intent to subscribe
      channel.postMessage({ type: 'subscription-request' })

      // Proceed with subscription after short delay (allows other tabs to respond)
      void performSubscribe(me.id).then((result) => {
        clearTimeout(timeout)

        if (!resolved) {
          resolved = true
          channel.removeEventListener('message', handler)
          resolve(result)
        }
      })
    })

  return performSubscribe(me.id)
}

// Handle subscription expiration (404/410 errors)
export function handleSubscriptionError(error: Error & { code?: number }): void {
  if (error.code === 404 || error.code === 410) {
    // Subscription expired, clear and allow re-subscription
    const ids = getSubscriptionIds()

    if (ids.length > 0) {
      clearSubscriptions()

      // Re-subscribe if authenticated
      const me = account.extract()

      if (me !== null && me !== undefined)
        void subscribe()
    }
  }
}
