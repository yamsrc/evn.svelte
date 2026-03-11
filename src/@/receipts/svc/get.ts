import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Receipt } from './Receipt'

export async function list(): Promise<Receipt[] | Error> {
  const me = await having(account)

  return await net.get(me.id)
}

export async function get(id: string): Promise<Receipt | Error> {
  const me = await having(account)

  return await net.receipt.get(me.id, id)
}
