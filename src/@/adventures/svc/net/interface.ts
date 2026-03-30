import { origin } from '@/net'
import type { Contact } from '@/contacts/svc/net'
import type { Adventure, Expense, Invitation } from './Adventure'

const adventures = origin.resource<Adventure>('/adventures/', { credentials: 'include' })

export async function get(identity: string): Promise<Adventure[] | Error> {
  return adventures.json(identity)
}

export type Create = Pick<Adventure, 'title' | 'picture'> & { participants?: string[] }

export async function post(identity: string, body: Create): Promise<Adventure | Error> {
  return adventures.json(identity, { method: 'POST', body })
}

export type Assign = Partial<Pick<Adventure, 'title' | 'picture'>> & { participants?: never }

export async function patch(identity: string, id: string, body: Assign): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'PATCH', body })
}

export interface Add {
  participants?: string[]
  expenses?: ExpenseInput[]
}

export async function add(identity: string, id: string, body: Add): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'POST', body })
}

export interface ArchiveInput {
  merge?: boolean
}

export async function put(identity: string, id: string, body: ArchiveInput): Promise<Adventure | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'PUT', body })
}

export async function del(identity: string, id: string): Promise<void | Error> {
  return adventures.json(`${identity}/${id}`, { method: 'DELETE' })
}

export async function expose(identity: string, id: string): Promise<Contact[] | Error> {
  return adventures.json(`${identity}/${id}/contacts/`)
}

export type ExpenseInput = Pick<Expense, 'title' | 'amount' | 'payer'> &
  Partial<Pick<Expense, 'location' | 'date' | 'attachments'>>

export const expenses = {
  create: (identity: string, adventure: string, body: { expenses: ExpenseInput[] }): Promise<Adventure | Error> =>
    adventures.json(`${identity}/${adventure}/`, { method: 'POST', body }),
  update: (identity: string, adventure: string, id: string, body: Partial<ExpenseInput>): Promise<Adventure | Error> =>
    adventures.json(`${identity}/${adventure}/${id}`, { method: 'PATCH', body }),
}

export const pictures = {
  resource: origin.resource<{ id: string }>('/adventures/pictures'),
  post: (body: File): Promise<{ id: string } | Error> =>
    pictures.resource.json('', { method: 'POST', body, credentials: 'include' }),
}

export const invitations = {
  resource: origin.resource<Invitation>('/adventures/invitations/'),
  get: (id: string): Promise<Invitation | Error> => invitations.resource.json(id),
  del: (id: string): Promise<Adventure | Error> =>
    invitations.resource.json<Adventure>(id, { method: 'DELETE', credentials: 'include' }),
}
