import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { receipts } from './store'
import * as net from './net'

export async function reset(id: string) {
  const me = ensure(account)

  const receipt = await net.claims.del(me.id, id)

  if (receipt instanceof Error) return receipt

  sync(receipts, receipt)
}
