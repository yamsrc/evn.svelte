import { origin } from '@/net'

const otp = origin.resource('/accounts/otp/')

interface Post {
  email: string
}

async function post(id: string, body: Post): Promise<void | Error>
async function post(body: Post): Promise<void | Error>

async function post(a: string | Post, b?: Post): Promise<void | Error> {
  if (typeof a === 'string') return await otp.json(a, { method: 'POST', body: b, credentials: 'include' })
  else return await otp.json({ method: 'POST', body: a })
}

export { post }
