import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function assign(id: string, input: net.Assign): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.patch(me.id, id, input)

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
