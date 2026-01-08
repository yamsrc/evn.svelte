import { origin } from '@/net'

const federation = origin.resource('/identity/federation/', { credentials: 'include' })

interface Post {
  scheme: 'bearer' | 'code'
  credentials: string
}

export async function post(identity: string, body: Post): Promise<void | Error> {
  return await federation.json(identity, { method: 'POST', body })
}
