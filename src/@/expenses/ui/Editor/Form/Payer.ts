import type { Value } from './Form'
import type { Account } from '@/accounts'
import type { Contact } from '@/contacts'

export interface Props {
  participant: Value['participants'][string]
  account: Account
  contact?: Contact
}
