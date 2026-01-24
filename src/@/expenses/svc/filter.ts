import { search } from '$lib/tools'
import type { Expense } from './net'

export function filter(expenses: Expense[], query?: string): Expense[] {
  return search(expenses, query, stringify)
}

function stringify(expense: Expense): string {
  return expense.title + ' ' + expense.location
}
