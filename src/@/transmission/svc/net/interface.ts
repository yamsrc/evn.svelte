import { origin } from '@/net'
import type { PingResponse, SubscribeInput, SubscribeResponse } from './Transmission'

const transmission = origin.resource<SubscribeResponse | PingResponse>('/transmission/', { credentials: 'include' })

export async function subscribe(identity: string, body: SubscribeInput): Promise<SubscribeResponse | Error> {
  return transmission.json(identity, { method: 'POST', body })
}

export async function ping(identity: string, body?: { fail?: boolean }): Promise<PingResponse | Error> {
  return transmission.json(`${identity}/ping`, {
    method: 'POST',
    body: { identity, ...body },
  })
}
