import { browser } from '$app/environment'
import { subscribed } from './store'
import { get } from './subscription'

export async function unsubscribe(): Promise<void> {
  if (!browser || !('serviceWorker' in navigator))
    return

  try {
    const subscription = await get()

    await subscription?.unsubscribe()
    subscribed.set(false)
  } catch (error) {
    console.warn('Failed to unsubscribe from browser:', error)
  }
}
