import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { expenses } from './store'

export async function add(input: net.Editable): Promise<net.Expense | Error> {
  const me = await having(account)

  const expense = await net.post(me.id, input)

  if (expense instanceof Error) return expense

  sync(expenses, expense)

  return expense
}
