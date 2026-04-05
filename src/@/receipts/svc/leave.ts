import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function leave(id: string, actor: string): Promise<void | Error> {
  const me = ensure(account)

  if (me.id === actor)
    internal.delete(id)

  const receipt = await net.receipt.del(me.id, id, actor)

  if (receipt instanceof Error) return receipt

  if (me.id !== actor)
    sync(internal, receipt)
}
