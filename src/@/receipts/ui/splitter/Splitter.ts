import type { Receipt } from '@/receipts'
import type { Account } from '@/accounts'

export interface Props {
  receipt: Receipt
  actor: Account
}
