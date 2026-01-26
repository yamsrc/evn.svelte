import { browser } from '$app/environment'

export async function unsubscribe(): Promise<void> {
  if (!browser || !('serviceWorker' in navigator))
    return

  try {
    const registration = await navigator.serviceWorker.ready
    const subscription = await registration.pushManager.getSubscription()

    if (subscription !== null && subscription !== undefined)
      await subscription.unsubscribe()
  } catch (error) {
    console.warn('Failed to unsubscribe from browser:', error)
  }
}
