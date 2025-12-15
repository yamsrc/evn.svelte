import { origin } from '@/net'
import type { Account } from '@/iam'
import type { CreationResponse, RequestResponse } from '@/passkeys/svc/net'

const passkeys = origin.resource('/accounts/passkeys/')

async function post(id: string, body: CreationResponse): Promise<Account | Error>
async function post(body: RequestResponse): Promise<Account | Error>

async function post(a: string | RequestResponse, body?: CreationResponse): Promise<Account | Error> {
  if (typeof a === 'string') return await passkeys.json(a, { method: 'POST', body, credentials: 'include' })
  else return await passkeys.json('.', { method: 'POST', body: a })
}

export { post }
