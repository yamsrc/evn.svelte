import { ensure } from 'svas'
import { account } from '@/iam'
import { favorites as store } from './store'
import * as net from './net'

export async function del(id: string): Promise<void | Error> {
  const me = ensure(account)

  const entity = await net.del(me.id, id)

  if (entity instanceof Error) return entity

  store.delete(id)

  return entity
}
