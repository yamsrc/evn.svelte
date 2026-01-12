import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { Group } from './net'

export async function get(): Promise<Group[] | Error> {
  const me = await having(account)

  return await net.get(me.id)
}
