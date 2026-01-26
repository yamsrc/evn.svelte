import { browser } from '$app/environment'
import { account } from '@/iam'
import * as net from './net'
import { clearSubscriptions, getSubscriptionIds } from './store'

export async function unsubscribe(): Promise<void | Error> {
  if (!browser) return

  const me = account.extract()

  if (me === null || me === undefined)
    return new Error('Not authenticated')

  const ids = getSubscriptionIds()

  if (ids.length === 0)
    return // Nothing to unsubscribe

  // Unsubscribe from backend
  const result = await net.unsubscribe(me.id, { ids })

  if (result instanceof Error) {
    // Even if backend fails, clear local subscriptions
    clearSubscriptions()

    return result
  }

  // Unsubscribe from browser
  try {
    const registration = await navigator.serviceWorker.getRegistration('/sw.js')

    if (registration !== null && registration !== undefined) {
      const subscription = await registration.pushManager.getSubscription()

      if (subscription !== null && subscription !== undefined)
        await subscription.unsubscribe()
    }
  } catch (error) {
    console.warn('Failed to unsubscribe from browser:', error)
  }

  // Clear local subscriptions
  clearSubscriptions()
}
