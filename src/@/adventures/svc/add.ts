import { having, sync } from 'svas'
import { account } from '@/iam'
import { adventures } from './store'
import * as net from './net'

export async function add(id: string, participants: string[]): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.add(me.id, id, { participants })

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
