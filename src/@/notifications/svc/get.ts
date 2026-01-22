import { ensure } from 'svas'
import { account } from '@/iam'
import { net } from './net'
import type { Notification } from './net'

export async function get(): Promise<Notification[] | Error> {
  const me = ensure(account)

  return await net.get(me.id)
}
