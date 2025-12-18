import type { Account } from '@/iam'

type AccountLike = Pick<Account, 'name' | 'picture'>

export interface Props {
  account: AccountLike
  size?: number
  class?: string
}
