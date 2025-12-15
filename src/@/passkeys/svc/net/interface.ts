import { Resource, type Failure } from '@toa.io/origin'
import type { CreationResponse } from './CreationResponse'
import type { Passkey } from './Passkey'
import type { RequestResponse } from './RequestResponse'

const passkeys = new Resource('/identity/passkeys/')

async function post(body: RequestResponse): Promise<void | Failure>
async function post(identity: string, body: CreationResponse): Promise<Passkey | Failure>

async function post(
  identity: string | RequestResponse,
  body?: CreationResponse,
): Promise<void | Passkey | Failure> {
  if (typeof identity === 'string')
    return await passkeys.post.none([identity], { body, credentials: 'include' })
  else return await passkeys.post.none(undefined, { body: identity })
}

async function get(identity: string): Promise<Passkey[] | Failure> {
  return await passkeys.get.array([identity], { credentials: 'include' })
}

async function del(identity: string, id: string): Promise<void | Failure> {
  return await passkeys.delete.none([identity, id], { credentials: 'include' })
}

export { post, get, del }
export * as challenges from './challenges'
