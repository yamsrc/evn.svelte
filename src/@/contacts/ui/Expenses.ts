import type { Contact } from '@/contacts'
import type { Expense } from '@/expenses'
import type { Notification } from '@/notifications'

export interface Props {
  contact: Contact
  expenses: Expense[]
  notifications?: Notification[]
}
