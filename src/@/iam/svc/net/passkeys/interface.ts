import { Resource } from '@toa.io/origin'
import type { Account } from '@/iam'
import type { CreationResponse, RequestResponse } from '@/passkeys/svc/net'

const passkeys = new Resource('/accounts/passkeys/')

async function post(id: string, body: CreationResponse): Promise<Account | Error>
async function post(body: RequestResponse): Promise<Account | Error>

async function post(a: string | RequestResponse, body?: CreationResponse): Promise<Account | Error> {
  if (typeof a === 'string') return await passkeys.post.value([a], { body, credentials: 'include' })
  else return await passkeys.post.value(undefined, { body: a })
}

export { post }
