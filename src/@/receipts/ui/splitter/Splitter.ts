import type { Receipt } from '@/receipts'
import type { Account } from '@/accounts'

export type AccountLike = Pick<Account, 'id' | 'name'>

export interface Props {
  receipt: Receipt
  account: AccountLike
  actor?: string
}
