import { search } from '$lib/tools'
import type { Expense } from './net'

export function filter(expenses: Expense[], query?: string): Expense[] {
  return search(expenses, query, (expense) => expense.title + ' ' + expense.location)
}
