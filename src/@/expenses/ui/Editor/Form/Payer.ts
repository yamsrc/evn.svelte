import type { Account } from '@/accounts'
import type { Contact } from '@/contacts'
import type { Participant } from '@/expenses'

export interface Props {
  account: Account
  participant: Participant
  contact?: Contact
  split?: boolean
  selected?: boolean
  onselect?: (identity: string, selected: boolean) => void
}
