import { origin } from '@/net'
import type { CreationResponse } from './CreationResponse'
import type { Passkey } from './Passkey'
import type { RequestResponse } from './RequestResponse'

const passkeys = origin.resource('/identity/passkeys/')

async function post(body: RequestResponse): Promise<void | Error>
async function post(identity: string, body: CreationResponse): Promise<Passkey | Error>

async function post(
  identity: string | RequestResponse,
  body?: CreationResponse,
): Promise<void | Passkey | Error> {
  if (typeof identity === 'string')
    return await passkeys.json(identity, { body, credentials: 'include' })
  else return await passkeys.json('.', { body: identity })
}

async function get(identity: string): Promise<Passkey[] | Error> {
  return await passkeys.json<Passkey[]>(identity, { credentials: 'include' })
}

async function del(identity: string, id: string): Promise<void | Error> {
  return await passkeys.json(identity, { credentials: 'include' })
}

export { post, get, del }
export * as challenges from './challenges'
