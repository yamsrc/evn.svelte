import { origin } from '@/net'
import type { Expense } from './Expense'

const expenses = origin.resource<Expense>('/expenses/', { credentials: 'include' })

type Editable = Partial<Pick<Expense, 'date' | 'title' | 'location' | 'extras' | 'attachments'>>

export async function get(identity: string): Promise<Expense[] | Error> {
  return expenses.json(identity)
}

export interface Post extends Editable {
  participants: Expense['participants']
  links?: Expense['links']
  template?: boolean
}

export async function post(identity: string, body: Post): Promise<Expense | Error> {
  return expenses.json(identity, { method: 'POST', body })
}

export type Put = Partial<Pick<Expense, 'date' | 'title' | 'location' | 'participants' | 'extras' | 'attachments'>>

export async function put(identity: string, id: string, body: Put): Promise<Expense | Error> {
  return expenses.json(`${identity}/${id}`, { method: 'PUT', body })
}

export async function del(identity: string, id: string): Promise<Expense | Error> {
  return expenses.json(`${identity}/${id}`, { method: 'DELETE' })
}
