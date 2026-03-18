import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Contact } from '@/contacts/svc/net'

export async function expose(id: string): Promise<Contact[] | Error> {
  const me = await having(account)

  return await net.expose(me.id, id)
}
