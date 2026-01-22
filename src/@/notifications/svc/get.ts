import { ensure } from 'svas'
import { account } from '@/iam'
import { net } from './net'
import type { Notification } from './net'

export async function get(): Promise<Notification[] | Error> {
  const me = ensure(account)

  const result = await net.get(me.id)

  if (result instanceof Error) return result

  const additional: Notification[] = Array.from({ length: 3 }, (_, i) => ({
    id: `test-${i}`,
    identity: 'test',
    domain: 'accounts',
    event: 'created',
    key: `test-${i}`,
    _created: new Date().getTime(),
    _version: 1,
  }))

  return result.concat(additional)
}
