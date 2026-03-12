import type { Group } from '@/groups'
import type { Contact } from '@/contacts'
import type { Account } from '@/accounts'

export interface Props {
  group: Group
  account: Pick<Account, 'id' | 'name' | 'picture'>
  contacts: Contact[]
  class?: string
}
