import type { Receipt } from '@/receipts'
import type { AccountLike } from './Splitter'

export interface Props {
  receipt: Receipt
  account: AccountLike
}
