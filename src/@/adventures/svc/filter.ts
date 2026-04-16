import { accounts } from '@/accounts'
import { search } from '$lib/tools'
import type { Adventure } from './net'

export function filter(adventures: Adventure[], query?: string): Adventure[] {
  return search(adventures, query, stringify)
}

function stringify(adventure: Adventure): string {
  const expenses = adventure.expenses
    .flatMap((e) => [e.title, e.location])
    .filter(Boolean)
    .join(' ')

  const participants = Object.keys(adventure.participants)
    .map((id) => accounts.extract(id)?.name)
    .filter(Boolean)
    .join(' ')

  return [adventure.title, expenses, participants].join(' ')
}
