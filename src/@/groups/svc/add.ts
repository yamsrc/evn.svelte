import { track } from '@vercel/analytics'
import { having } from 'svas'
import { sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function add(id: string, identities: string[]): Promise<net.Group | Error> {
  const me = await having(account)

  const res = await net.add(me.id, id, identities)

  if (res instanceof Error) return res

  sync(internal, res)
  track('Group')

  return res
}
