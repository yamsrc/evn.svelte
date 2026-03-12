import type { Notification } from '@/notifications'
import type { Expense } from '@/expenses'
import type { Contact } from '@/contacts'

export interface Props {
  contact: Contact
  expenses: Expense[]
  notifications?: Notification[]
}
