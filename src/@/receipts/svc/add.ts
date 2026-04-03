import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { receipts } from './store'
import * as net from './net'

export async function add(id: string, participants: string[]): Promise<void | Error> {
  const me = ensure(account)

  receipts.update(id, (receipt) => {
    receipt.identities = [...new Set([...receipt.identities, ...participants])]

    return receipt
  })

  const receipt = await net.receipt.post(me.id, id, { participants })

  if (receipt instanceof Error) {
    // rollback
    receipts.update(id, (receipt) => {
      receipt.identities = receipt.identities.filter((identity) => !participants.includes(identity))

      return receipt
    })

    return receipt
  }

  sync(receipts, receipt)
}
