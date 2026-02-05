import { channel } from './channel'
import { subscribed } from './store'

export async function unsubscribe(): Promise<void> {
  await channel!.unsubscribe()
  subscribed.set(false)
}
