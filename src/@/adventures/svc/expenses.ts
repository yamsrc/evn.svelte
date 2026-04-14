import { having, sync } from 'svas'
import { account } from '@/iam'
import { adventures } from './store'
import * as net from './net'

export async function create(id: string, input: net.ExpenseInput): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.expenses.create(me.id, id, { expenses: [input] })

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}

export async function update(adventureId: string, id: string, input: Partial<net.ExpenseInput>): Promise<net.Adventure | Error> {
  const me = await having(account)
  const adventure = await net.expenses.update(me.id, adventureId, id, input)

  if (adventure instanceof Error) return adventure

  sync(adventures, adventure)

  return adventure
}
