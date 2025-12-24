import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Contact } from './net'

export async function add(contact: string): Promise<Contact | Error> {
  const me = await having(account)

  const res = await net.post(me.id, contact)

  if (res instanceof Error) return res

  return res
}
