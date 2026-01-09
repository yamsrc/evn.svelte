import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function get(): Promise<net.Favorite[] | Error> {
  const me = ensure(account)

  return net.get(me.id)
}
