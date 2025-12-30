import { accounts } from '@/accounts'
import type { Contact } from './Contact'
import type * as net from './net'

export function map(entry: net.Contact, me: string): Contact {
  const i = entry.identities
  const identity = me === i[0] ? i[1] : i[0]
  const balance = me === i[0] ? -entry.balance : entry.balance
  const account = accounts.extract(identity)

  const contact: Contact = {
    ...entry,
    identity,
    balance,
    account,
    managed: me === account?.overlord,
  }

  return contact
}
