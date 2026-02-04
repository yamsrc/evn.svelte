import { channel } from './channel'
import { permission, subscribed } from './store'

export async function subscribe(): Promise<void | Error> {
  const result = await channel.subscribe()

  if (result instanceof Error) return result

  permission.set(await channel.permission())
  subscribed.set(await channel.isSubscribed())
}

export async function request(): Promise<void> {
  const result = await channel.request()

  permission.set(result)

  if (result !== 'granted') return

  await subscribe()
}
