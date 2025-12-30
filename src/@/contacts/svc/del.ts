import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'
import type { Contact } from './Contact'

export async function del(contact: Contact): Promise<void | Error> {
  const me = ensure(account)
  const res = await net.del(me.id, contact.identity)

  if (res instanceof Error) return res

  internal.delete(contact.id)

  return res
}
