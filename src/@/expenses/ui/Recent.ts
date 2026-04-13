import type { Receipt } from '@/receipts'
import type { Notification } from '@/notifications'
import type { Expense } from '@/expenses'

export interface Props {
  expenses: Expense[]
  receipts: Receipt[]
  notifications?: Notification[]
}
