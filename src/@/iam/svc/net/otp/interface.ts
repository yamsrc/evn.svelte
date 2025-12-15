import { Resource } from '@toa.io/origin'

const otp = new Resource('/accounts/otp/')

interface Post {
  email: string
}

async function post(body: Post): Promise<void | Error> {
  return await otp.post.none(undefined, { body })
}

export { post }
