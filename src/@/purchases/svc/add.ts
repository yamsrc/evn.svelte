import { having } from 'svas'
import { track } from '@vercel/analytics'
import { account, update as updateMe } from '@/iam'
import * as net from './net'
import type { Account } from '@/accounts'

export async function add(): Promise<Account | Error> {
  const me = await having(account)

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const res = await net.post(me.id, { timezone })

  if (res instanceof Error) return res

  updateMe(res)
  track('Premium')

  return res
}
