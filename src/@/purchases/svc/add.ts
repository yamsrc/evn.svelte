import { having } from 'svas'
import { account, update as updateMe } from '@/iam'
import { track } from '@/ga'
import * as net from './net'
import type { Account } from '@/accounts'

export async function add(): Promise<Account | Error> {
  const me = await having(account)

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const res = await net.post(me.id, { timezone })

  if (res instanceof Error) return res

  updateMe(res)
  track('purchases.completed', { method: 'free' })

  return res
}
