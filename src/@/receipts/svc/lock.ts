import { ensure, sync } from 'svas'
import { track } from '@vercel/analytics'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function lock(id: string) {
  const me = ensure(account)
  const receipt = await net.receipt.lock(me.id, id)

  if (receipt instanceof Error) return receipt

  sync(internal, receipt)
}

export async function unlock(id: string) {
  const me = ensure(account)
  const receipt = await net.receipt.unlock(me.id, id)

  if (receipt instanceof Error) return receipt

  sync(internal, receipt)

  track('Receipts.Locked')
}
