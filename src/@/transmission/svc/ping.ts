import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

/** Sends a ping to the backend for the current user; optional fail flag for testing. */
export async function ping(body?: { fail?: boolean }): Promise<net.PingResponse | Error> {
  const me = ensure(account)

  return await net.ping(me.id, body)
}
