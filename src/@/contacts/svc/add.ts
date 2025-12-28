import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function add(contact: string): Promise<void | Error> {
  const me = await having(account)

  const res = await net.post(me.id, contact)

  if (res instanceof Error)
    return res

  sync(internal, res)
}
