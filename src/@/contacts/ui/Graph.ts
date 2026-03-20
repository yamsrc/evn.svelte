import type { Contact } from '@/contacts'
import type { Account } from '@/accounts'

export type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>
export type ContactLike = Pick<Contact, 'identities' | 'balance'>

export interface Props {
  contacts: ContactLike[]
  accounts: AccountLike[]
  class?: string
}
