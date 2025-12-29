import type { Account } from '@/account'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export interface Props {
  account: AccountLike
}
