import { origin } from '@/net'
import type { RequestResponse } from './RequestResponse'
import type { Passkey } from './Passkey'
import type { CreationResponse } from './CreationResponse'

const passkeys = origin.resource('/identity/passkeys/')

async function post(body: RequestResponse): Promise<void | Error>
async function post(identity: string, body: CreationResponse): Promise<Passkey | Error>

async function post(
  arg: string | RequestResponse,
  body?: CreationResponse,
): Promise<void | Passkey | Error> {
  if (typeof arg === 'string')
    return await passkeys.json(arg, { body, credentials: 'include' })
  else
    return await passkeys.json({ body: arg })
}

async function get(identity: string): Promise<Passkey[] | Error> {
  return await passkeys.json<Passkey[]>(identity, { credentials: 'include' })
}

async function del(identity: string, _: string): Promise<void | Error> {
  return await passkeys.json(identity, { credentials: 'include' })
}

export { post, get, del }
export * as challenges from './challenges'
