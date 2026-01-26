import { origin } from '@/net'
import type { SubscribeInput, SubscribeResponse, UnsubscribeInput } from './Subscription'

const transmission = origin.resource<SubscribeResponse>('/transmission/', { credentials: 'include' })

export async function subscribe(accountId: string, body: SubscribeInput): Promise<SubscribeResponse | Error> {
  return transmission.json(accountId, { method: 'POST', body })
}

export async function unsubscribe(accountId: string, body: UnsubscribeInput): Promise<number | Error> {
  const result = await transmission.json(accountId, { method: 'POST', body })

  if (result instanceof Error) return result

  // Backend returns number (remaining subscription count)
  return result as unknown as number
}
