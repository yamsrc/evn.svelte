import type { Expense } from '@/expenses'
import type { Notification } from '@/notifications'

export interface Props {
  expenses: Expense[]
  search?: string
  notifications?: Notification[]
}
