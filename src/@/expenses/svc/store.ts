import { collection, sync, values } from 'svas'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type * as net from './net'

export const expenses = collection<net.Expense>({
  get,
  persist: 'expenses',
  bind: account,
  stale: true,
  values: values<net.Expense>(),
})

events.on('default.expenses.sync', (entry: net.Expense) => sync(expenses, entry))
