import { origin } from '@/net'

const otp = origin.resource('/accounts/otp/')

interface Post {
  email: string
}

async function post(body: Post): Promise<void | Error> {
  return await otp.json({ body })
}

export { post }
