import type { Group } from './net'
import type { Account } from '@/account'
import type { Contact } from '@/contacts'

export function balance(group: Group, contacts: Contact[], account: Account): number {
  const identities = group.identities.filter((identity) => identity !== account.id)

  const balances = identities.map((identity) =>
    contacts.find((contact) => contact.identity === identity)?.balance ?? 0)

  return balances.reduce((acc, balance) => acc + balance, 0)
}
