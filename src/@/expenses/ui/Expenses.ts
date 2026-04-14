import type { Notification } from '@/notifications'
import type { Expense } from '@/expenses'

export interface Props {
  expenses: Expense[]
  search?: string
  notifications?: Notification[]
}
