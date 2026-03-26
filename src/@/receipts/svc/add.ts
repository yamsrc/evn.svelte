import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { receipts } from './store'
import * as net from './net'

export async function add(id: string, participants: string[]): Promise<void | Error> {
  const me = ensure(account)
  const receipt = await net.receipt.post(me.id, id, { participants })

  if (receipt instanceof Error) return receipt

  sync(receipts, receipt)
}
