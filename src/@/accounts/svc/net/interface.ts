import { origin } from '@/net'
import type { Account } from './Account'

const accounts = origin.resource<Account>('/accounts/')

export type Editable = Partial<Pick<Account, 'name' | 'picture' | 'locale'>>

export async function get(id: string): Promise<Account | Error> {
  return accounts.json(id)
}

export async function put(id: string, body: Editable): Promise<Account | Error> {
  return accounts.json(id, { method: 'PUT', body, credentials: 'include' })
}

export async function patch(id: string, body: Editable): Promise<Account | Error> {
  return accounts.json(id, { method: 'PATCH', body, credentials: 'include' })
}

export async function del(id: string): Promise<void | Error> {
  return await accounts.json(id, { method: 'DELETE', credentials: 'include' })
}

export const managed = {
  patch: (identity: string, managed: string, body: Editable) => patch(`managed/${identity}/${managed}`, body),
}
