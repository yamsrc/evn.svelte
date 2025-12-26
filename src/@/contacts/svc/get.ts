import { having } from 'svas'
import { account } from '@/iam'
import { map } from './map'
import * as net from './net'
import type { Contact } from './Contact'

export async function get(): Promise<Contact[] | Error> {
  const me = await having(account)
  const entries = await net.get(me.id)

  if (entries instanceof Error)
    return entries

  const contacts = await Promise.all(entries.map((entry) => map(entry)))

  return contacts.filter((contact) => !(contact instanceof Error)) as Contact[]
}
