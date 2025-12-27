import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { groups } from './store'

export async function del(id: string): Promise<void | Error> {
  const me = await having(account)

  const res = await net.del(me.id, id)

  if (res instanceof Error) return res

  groups.delete(id)

  return res
}
