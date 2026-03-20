import { having, sync } from 'svas'
import { account } from '@/iam'
import { adventures } from './store'
import * as net from './net'

export async function create(input: net.Create): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.post(me.id, input)

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
