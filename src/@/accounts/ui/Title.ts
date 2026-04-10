import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'name' | 'premium'>

export interface Props {
  account: AccountLike
  class?: string
}
