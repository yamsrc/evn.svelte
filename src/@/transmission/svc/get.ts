import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Permissions } from './net/Transmission'

export async function get(): Promise<Permissions | Error> {
  const me = ensure(account)
  const result = await net.get(me.id)

  if (result instanceof Error) return result

  return result.permissions
}
