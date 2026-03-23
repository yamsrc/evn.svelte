import type { Adventure, Expense } from '@/adventures'

export interface Props {
  adventure: Adventure
  expense: Partial<Expense>
  /** When bound, shares array with Attachments / parent; default seeds from expense.attachments */
  attachments?: string[]
}
