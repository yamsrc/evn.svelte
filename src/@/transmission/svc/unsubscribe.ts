import { subscribed } from './store'
import { channel } from './channel'

export async function unsubscribe(): Promise<void> {
  await channel!.unsubscribe()
  subscribed.set(false)
}
