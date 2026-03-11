import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function leave(id: string): Promise<void | Error> {
  const me = await having(account)
  const result = await net.del(me.id, id)

  if (result instanceof Error) return result

  adventures.delete(id)
}
