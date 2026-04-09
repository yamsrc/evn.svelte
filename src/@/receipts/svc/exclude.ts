import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function exclude(receiptId: string, extraId: string, value = false) {
  const me = ensure(account)

  // optimistic
  internal.update(receiptId, (receipt) => {
    const index = receipt.extras.findIndex((e) => e.id === extraId)

    if (index === -1) throw new Error('Extra not found')

    // Rich, Rich...
    receipt.extras[index] = { ...receipt.extras[index], included: value }
    receipt.extras = [...receipt.extras]

    return receipt
  })

  const receipt = await net.extras.patch(me.id, receiptId, extraId, { included: value })

  if (receipt instanceof Error) return receipt

  sync(internal, receipt)
}

export function include(receiptId: string, extraId: string) {
  return exclude(receiptId, extraId, true)
}
