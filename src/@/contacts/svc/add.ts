import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function add(body: net.Post): Promise<net.Contact | Error> {
  const me = await having(account)

  const res = await net.post(me.id, body)

  if (res instanceof Error)
    return res

  sync(internal, res)

  return res
}
