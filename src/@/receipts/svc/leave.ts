import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { receipts } from './store'
import * as net from './net'

export async function leave(id: string, actor: string): Promise<void | Error> {
  const me = ensure(account)

  if (me.id === actor)
    receipts.delete(id)

  const receipt = await net.receipt.del(me.id, id, actor)

  if (receipt instanceof Error) return receipt

  if (me.id !== actor)
    sync(receipts, receipt)
}
