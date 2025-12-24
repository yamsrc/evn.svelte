import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Contact } from './net'

export async function get(): Promise<Contact[] | Error> {
  const me = await having(account)

  return await net.get(me.id)
}
