import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function claim(id: string, body: net.ReceiptPut): Promise<void | Error> {
  const me = ensure(account)
  const receipt = await net.receipt.put(me.id, id, body)

  if (receipt instanceof Error)
    return receipt

  sync(internal, receipt)
}
