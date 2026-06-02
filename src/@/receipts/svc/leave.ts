import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function leave(id: string, actor: string): Promise<void | Error> {
  const me = ensure(account)

  internal.update(id, (receipt) => {
    receipt.identities = receipt.identities.filter((identity) => identity !== actor)

    return receipt
  })

  const receipt = await net.receipt.leave(me.id, id, actor)

  if (receipt instanceof Error) return receipt

  if (me.id !== actor)
    sync(internal, receipt)
}
