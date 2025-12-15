import { Resource, type Failure } from '@toa.io/origin'
import type { CreationOptions, RequestOptions } from './Options'

const challenges = new Resource('/identity/passkeys/challenges/')

async function post(type: 'creation', id?: string): Promise<CreationOptions | Failure>
async function post(type: 'request', id?: string): Promise<RequestOptions | Failure>

async function post(type: Type, id?: string): Promise<CreationOptions | RequestOptions | Failure> {
  const body = { type }

  if (id === undefined) return await challenges.post.value(undefined, { body })
  else return await challenges.post.value([id], { body })
}

type Type = 'creation' | 'request'

export { post }
