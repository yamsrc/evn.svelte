import type { Account } from '@/iam'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export interface Props {
  account: AccountLike
  size?: number
  class?: string
}
