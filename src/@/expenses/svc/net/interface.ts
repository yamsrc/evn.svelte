import { origin } from '@/net'
import type { Expense } from './Expense'

const expenses = origin.resource<Expense>('/expenses/', { credentials: 'include' })

export type Editable = Pick<Expense, 'title' | 'location' | 'participants' | 'extras'>

export async function get(identity: string): Promise<Expense[] | Error> {
  return expenses.json(identity)
}

export async function post(identity: string, body: Editable): Promise<Expense | Error> {
  return expenses.json(identity, { method: 'POST', body })
}

export async function put(identity: string, id: string, body: Editable): Promise<Expense | Error> {
  return expenses.json(`${identity}/${id}`, { method: 'PUT', body })
}
