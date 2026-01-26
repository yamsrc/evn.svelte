import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function ping(body?: { fail?: boolean }): Promise<net.PingResponse | Error> {
  const me = ensure(account)

  return await net.ping(me.id, body)
}
