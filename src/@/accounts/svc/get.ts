import { tombstone, tombstones } from './deleted'
import * as net from './net'
import type { Account } from './net'

export async function get(id: string): Promise<Account | Error> {
  const result = await net.get(id)

  if (result instanceof Error)
    if ('code' in result && result.code === 404) {
      tombstones.add(id)

      return tombstone(id)
    }

  return result
}
