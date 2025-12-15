import { Resource, type Options, type Failure } from '@toa.io/origin'
import type { Message } from './Message'

const streams = new Resource<Message>('/presence/')

async function post<T extends Message = Message>(
  id: string,
  options?: Options,
): Promise<AsyncGenerator<T, void, undefined> | Failure> {
  return await streams.post.multipart<T>([id], { credentials: 'include', ...options })
}

export { post }
