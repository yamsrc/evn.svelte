import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function archive(id: string, merge?: boolean): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.put(me.id, id, { merge })

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
