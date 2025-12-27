import type { Account } from '@/account'
import type { Contact } from '@/contacts'

export interface ContactWithAccount extends Pick<Contact, 'id' | 'balance' | 'identity'> {
  account: Account
}

export interface Props {
  contact: ContactWithAccount
  selected?: boolean
  actionable?: boolean
  onselect?: (id: string, selected: boolean) => void
}
