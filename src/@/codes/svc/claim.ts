import { having } from 'svas'
import { account, update } from '@/iam'
import * as net from './net'
import type { Account } from '@/accounts'

export async function claim(code: string): Promise<Account | Error> {
  const me = await having(account)

  const res = await net.claim(me.id, code)

  if (res instanceof Error) return res

  update(res)

  return res
}
