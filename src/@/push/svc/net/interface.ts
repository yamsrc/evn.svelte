import { origin } from '@/net'
import type { SubscribeInput, SubscribeResponse, UnsubscribeInput } from './Subscription'

const transmission = origin.resource<SubscribeResponse>('/transmission/', { credentials: 'include' })

export async function subscribe(identity: string, body: SubscribeInput): Promise<SubscribeResponse | Error> {
  return transmission.json(identity, { method: 'POST', body })
}

export async function unsubscribe(identity: string, body: UnsubscribeInput): Promise<number | Error> {
  const result = await transmission.json(identity, { method: 'POST', body })

  if (result instanceof Error) return result

  // Backend returns number (remaining subscription count)
  return result as unknown as number
}
