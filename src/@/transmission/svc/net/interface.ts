import { origin } from '@/net'
import type { ConfigureInput, PingResponse, SubscribeInput, Transmission } from './Transmission'

const transmission = origin.resource<Transmission | PingResponse>('/transmission/', { credentials: 'include' })

export async function get(identity: string): Promise<Transmission | Error> {
  return transmission.json(identity)
}

export async function subscribe(identity: string, body: SubscribeInput): Promise<Transmission | Error> {
  return transmission.json(identity, { method: 'POST', body })
}

export async function configure(identity: string, body: ConfigureInput): Promise<Transmission | Error> {
  return transmission.json(identity, { method: 'PATCH', body })
}

export async function ping(identity: string, body?: { fail?: boolean }): Promise<PingResponse | Error> {
  return transmission.json(`${identity}/ping`, {
    method: 'POST',
    body: { identity, ...body },
  })
}
