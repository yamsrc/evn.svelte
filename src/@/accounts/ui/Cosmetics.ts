import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export interface Props {
  account: AccountLike
}
