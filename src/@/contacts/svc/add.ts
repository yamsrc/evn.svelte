import { ensure, sync } from 'svas'
import { track } from '@vercel/analytics'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function add(body: net.Post): Promise<net.Contact | Error> {
  const me = ensure(account)
  const res = await net.post(me.id, body)

  if (res instanceof Error)
    return res

  sync(internal, res)
  track('Contact')

  return res
}
