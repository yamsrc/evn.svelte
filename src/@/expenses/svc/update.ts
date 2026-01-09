import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { expenses } from './store'
import type { Exact } from '$lib/tools'

export async function update<T>(id: string, input: Exact<T, net.Editable>): Promise<net.Expense | Error> {
  const me = await having(account)

  const expense = await net.put(me.id, id, input)

  if (expense instanceof Error) return expense

  sync(expenses, expense)

  return expense
}
