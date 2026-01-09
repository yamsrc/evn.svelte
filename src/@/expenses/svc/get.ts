import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function get(identity?: string): Promise<net.Expense[] | Error> {
  const me = await having(account)

  return await net.get(identity ?? me.id)
}
