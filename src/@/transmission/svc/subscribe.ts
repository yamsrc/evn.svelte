import { meta } from '@toa.io/origin'
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

  if (result instanceof Error) {
    const response = meta(result.cause ?? result)

    if (response?.status !== 422)
      return result
  }

  permission.set(await channel!.permission())
  subscribed.set(true)
}

export async function request(): Promise<void> {
  const result = await channel!.request()

  permission.set(result)

  if (result !== 'granted') return

  await subscribe()
}
