import type { Contact } from '@/contacts'
import type { Account } from '@/accounts'
import type { Value } from './Form'

export interface Props {
  participant: Value['participants'][string]
  account: Account
  contact?: Contact
}
