import type { Expense, net } from '@/expenses'

export interface Props {
  expense: Expense | net.Editable
  onsend?: (expense: Expense) => void
}
