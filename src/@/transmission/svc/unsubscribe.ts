import { subscribed } from './store'
import { get } from './subscription'

/** Removes current push subscription and sets subscribed store to false. */
export async function unsubscribe(): Promise<void> {
  try {
    const subscription = await get()

    await subscription?.unsubscribe()
    subscribed.set(false)
  } catch (error) {
    console.warn('Failed to unsubscribe', error)
  }
}
