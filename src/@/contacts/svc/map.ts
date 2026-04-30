import { accounts } from '@/accounts/svc/store'
import type * as net from './net'
import type { Contact } from './Contact'

export function map(entry: net.Contact, me: string): Contact {
  const i = entry.identities
  const identity = me === i[0] ? i[1] : i[0]
  const lower = i[0] < i[1] ? i[0] : i[1]
  const balance = me === lower ? -entry.balance : entry.balance
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
