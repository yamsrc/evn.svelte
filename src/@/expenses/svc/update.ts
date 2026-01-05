import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { expenses } from './store'

export async function update(id: string, input: net.Editable): Promise<net.Expense | Error> {
  const me = await having(account)

  const expense = await net.put(me.id, id, input)

  if (expense instanceof Error) return expense

  sync(expenses, expense)

  return expense
}
