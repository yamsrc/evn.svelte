import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function expose(id: string) {
  const me = await having(account)

  return net.expose(me.id, id)
}
