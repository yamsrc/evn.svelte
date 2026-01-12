import * as net from './net'
import type { Account } from './net'

export async function get(id: string): Promise<Account | Error> {
  return await net.get(id)
}
