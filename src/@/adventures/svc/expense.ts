import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { adventures } from './store'

export async function expense(id: string, input: net.ExpenseInput[]): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.add(me.id, id, { expenses: input })

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
