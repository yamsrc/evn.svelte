import { channel } from './channel'
import { permission, subscribed } from './store'

export async function subscribe(): Promise<void | Error> {
  return channel.subscribe()
}

export async function request(): Promise<void> {
  await subscribe()
  permission.set(channel.getPermission())
  subscribed.set(await channel.isSubscribed())
}
