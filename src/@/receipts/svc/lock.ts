import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function lock(id: string) {
  const me = ensure(account)
  const receipt = await net.receipt.lock(me.id, id)

  if (receipt instanceof Error) return receipt

  sync(internal, receipt)
}
