import type { Account } from '@/accounts'
import type { Contact } from '@/contacts'
import type { Group } from '@/groups'

export interface Props {
  group: Group
  account: Pick<Account, 'id' | 'name' | 'picture'>
  contacts: Contact[]
  class?: string
}
