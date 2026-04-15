import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function get(): Promise<net.Template[] | Error> {
  const me = await having(account)

  return await net.get(me.id)
}
