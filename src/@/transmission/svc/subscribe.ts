import { ensure } from 'svas'
import { account } from '@/iam'
import { channel } from './channel'
import * as net from './net'
import { permission, subscribed } from './store'

export async function subscribe(): Promise<void | Error> {
  const input = await channel!.subscribe()

  if (input instanceof Error) return input

  const me = ensure(account)

  const result = await net.subscribe(me.id, input)

  if (result instanceof Error) return result

  permission.set(await channel!.permission())
  subscribed.set(await channel!.subscribed())
}

export async function request(): Promise<void> {
  const result = await channel!.request()

  permission.set(result)

  if (result !== 'granted') return

  await subscribe()
}
