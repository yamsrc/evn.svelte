import { ensure } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function del(id: string): Promise<void | Error> {
  const me = ensure(account)
  const res = await net.receipt.del(me.id, id)

  if (res instanceof Error) return res

  internal.delete(id)
}
