import { origin, type RequestOptions } from '@/net'
import type { Message } from './Message'

const streams = origin.resource<Message>('/presence/')

async function post(
  id: string,
  options?: RequestOptions,
): Promise<AsyncGenerator<Message, void, undefined> | Error> {
  return await streams.multipart<Message>(id, { credentials: 'include', ...options })
}

export { post }
