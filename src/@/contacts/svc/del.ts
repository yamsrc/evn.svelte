import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { contacts } from './store'
import type { Contact } from './Contact'

export async function del(contact: Contact): Promise<void | Error> {
  const me = await having(account)

  const res = await net.del(me.id, contact.identity)

  if (res instanceof Error) return res

  contacts.delete(contact.id)

  return res
}
