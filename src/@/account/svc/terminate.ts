import { having } from 'svas'
import { account, logout } from '@/iam'
import * as net from './net'

export async function terminate(): Promise<void | Error> {
  const me = await having(account)
  const ok = await net.del(me.id)

  if (ok instanceof Error) return ok

  logout()
}
