import { origin, type RequestOptions } from '@/net'
import type { Message } from './Message'

const streams = origin.resource<Message>('/presence/')

async function post<T extends Message>(
  id: string,
  options?: RequestOptions,
): Promise<AsyncGenerator<T, void, undefined> | Error> {
  return await streams.multipart<T>(id, { credentials: 'include', ...options })
}

export { post }
