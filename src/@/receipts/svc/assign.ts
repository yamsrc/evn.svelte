import { having, sync } from 'svas'
import { account } from '@/iam'
import { receipts } from './store'
import * as net from './net'

export async function assign(id: string, input: net.Assign): Promise<void | Error> {
  const me = await having(account)
  const receipt = await net.receipt.patch(me.id, id, input)

  if (receipt instanceof Error)
    return receipt

  sync(receipts, receipt)
}
