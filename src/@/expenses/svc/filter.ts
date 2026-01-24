import { search } from '$lib/tools'
import type { Expense } from './store'

export function filter(expenses: Expense[], query?: string): Expense[] {
  return search(expenses, query, stringify)
}

function stringify(expense: Expense): string {
  const names = Object.values(expense.accounts).map((account) => account?.name).filter((name) => name !== undefined).join(' ')

  return [expense.title, expense.location, names].join(' ')
}
