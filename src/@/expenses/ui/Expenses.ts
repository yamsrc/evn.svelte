import type { Expense } from '@/expenses'

export interface Props {
  expenses: Expense[]
  search?: string
}
