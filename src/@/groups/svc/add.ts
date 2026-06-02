import { having } from 'svas'
import { sync } from 'svas'
import { account } from '@/iam'
import { track } from '@/ga'
import { internal } from './store'
import * as net from './net'

export async function add(id: string, identities: string[]): Promise<net.Group | Error> {
  const me = await having(account)

  const res = await net.add(me.id, id, identities)

  if (res instanceof Error) return res

  sync(internal, res)
  track('groups.created')

  return res
}
