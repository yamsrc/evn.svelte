import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function terminate(): Promise<void | Error> {
  const me = ensure(account)
  const ok = await net.del(me.id)

  if (ok instanceof Error) return ok
}
