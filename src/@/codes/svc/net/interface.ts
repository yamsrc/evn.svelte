import { origin } from '@/net'
import type { Account } from '@/accounts'
import type { Code } from './Code'

const codes = origin.resource<Code>('/codes/', { credentials: 'include' })

export interface Post {
  interval: string
  code?: string
}

export async function create(body: Post): Promise<Code | Error> {
  return codes.json({ method: 'POST', body })
}

export async function claim(identity: string, id: string): Promise<Account | Error> {
  return codes.json<Account>(`${identity}/${id}/`, { method: 'DELETE' })
}
