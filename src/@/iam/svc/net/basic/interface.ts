import { origin } from '@/net'

const basic = origin.resource('/identity/basic/', { credentials: 'include' })

export interface Basic {
  username: string
  password: string
}

export async function post(id: string, body: Basic): Promise<void | Error> {
  return await basic.json(id, {
    method: 'POST',
    body,
  })
}
