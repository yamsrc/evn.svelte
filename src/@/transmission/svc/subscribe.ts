import { having } from 'svas'
import { meta } from '@toa.io/origin'
import { account } from '@/iam'
import { track } from '@/ga'
import { permission, subscribed } from './store'
import * as net from './net'
import { channel } from './channel'

export async function subscribe(): Promise<void | Error> {
  const input = await channel!.subscribe()

  if (input instanceof Error) return input

  const me = await having(account)
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

  if (result !== 'granted') {
    track('transmission.denied', { channel: channel!.name })

    return
  }

  track('transmission.granted', { channel: channel!.name })

  await subscribe()
}
