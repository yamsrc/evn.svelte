import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture' | 'deleted'>

export interface Props {
  account: AccountLike
  size?: number
  class?: string
  style?: string
}
