import { having, sync } from 'svas'
import { account } from '@/iam'
import { adventures } from './store'
import * as net from './net'

export async function archive(id: string, merge?: boolean): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.put(me.id, id, { merge })

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
