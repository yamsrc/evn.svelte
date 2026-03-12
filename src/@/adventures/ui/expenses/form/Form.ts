import type { Adventure, Expense } from '@/adventures'

export interface Props {
  adventure: Adventure
  expense: Partial<Expense>
}
