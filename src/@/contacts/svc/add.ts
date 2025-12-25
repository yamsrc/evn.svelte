import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Contact } from './net'

export async function add(body: net.Post): Promise<Contact | Error> {
  const me = await having(account)

  const res = await net.post(me.id, body)

  if (res instanceof Error) return res

  return res
}
