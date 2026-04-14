import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function list(): Promise<net.Receipt[] | Error> {
  const me = await having(account)

  return await net.get(me.id)
}

export async function get(id: string): Promise<net.Receipt | Error> {
  const me = await having(account)

  return await net.receipt.get(me.id, id)
}
