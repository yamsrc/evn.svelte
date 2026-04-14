import { ensure, sync } from 'svas'
import { account } from '@/iam'
import { internal } from './store'
import * as net from './net'

export async function update(id: string, properties: Partial<net.Put>): Promise<net.Expense | Error> {
  const me = ensure(account)
  const expense = await net.put(me.id, id, properties)

  if (expense instanceof Error)
    return expense

  sync(internal, expense)

  return expense
}
