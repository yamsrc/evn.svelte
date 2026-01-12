import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function send(message: string, email?: string): Promise<void | Error> {
  const me = ensure(account)

  return await net.post(me.id, { message, email })
}
