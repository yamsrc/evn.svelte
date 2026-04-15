import { ensure } from 'svas'
import { account } from '@/iam'
import { templates } from './store'
import * as net from './net'

export async function del(id: string): Promise<void | Error> {
  const me = ensure(account)
  const res = await net.del(me.id, id)

  if (res instanceof Error) return res

  templates.delete(id)
}
