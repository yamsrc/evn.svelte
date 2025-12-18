import { origin } from '@/net'
import type { Account } from './Account'

const accounts = origin.resource<Account>('/accounts/', { credentials: 'include' })

type Editable = Pick<Account, 'name' | 'picture' | 'locale'>

async function put(id: string, body: Editable): Promise<Account | Error> {
  return accounts.json(id, { method: 'PUT', body })
}

async function patch(id: string, body: Editable): Promise<Account | Error> {
  return accounts.json(id, { method: 'PATCH', body })
}

export { patch, put }

export type { Editable }
