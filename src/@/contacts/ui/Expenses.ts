import type { Contact } from '@/contacts'
import type { Expense } from '@/expenses'

export interface Props {
  contact: Contact
  expenses: Expense[]
}
