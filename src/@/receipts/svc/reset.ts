import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function reset(id: string) {
  const me = ensure(account)

  const receipt = await net.claims.del(me.id, id)

  if (receipt instanceof Error) return receipt

  sync(internal, receipt)
}
