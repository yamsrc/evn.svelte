import { origin } from '@/net'
import type { Account } from '@/accounts'

export type Purchase = {
  timezone: string
}

const purchases = origin.resource<Account>('/purchases/', { credentials: 'include' })

export async function post(identity: string, body: Purchase): Promise<Account | Error> {
  return purchases.json(identity, { method: 'POST', body })
}
