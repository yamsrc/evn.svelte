import { accounts } from '@/account'
import type { Contact } from './Contact'
import type * as net from './net'

export function map(entry: net.Contact, me: string): Contact {
  const i = entry.identities
  const identity = me === i[0] ? i[1] : i[0]
  const balance = me === i[0] ? -entry.balance : entry.balance

  const contact: Contact = {
    ...entry,
    identity,
    balance,
    account: accounts.extract(identity),
  }

  accounts.get(identity).subscribe((account) => (contact.account = account))

  return contact
}
