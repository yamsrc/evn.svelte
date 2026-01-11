import { collection, sync, values } from 'svas'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get } from './get'
import type { Expense } from './net'

export const expenses = collection<Expense>({
  get,
  persist: 'expenses',
  bind: account,
  stale: true,
  values: values<Expense>(),
})

events.on('default.expenses.sync', (entry: Expense) => sync(expenses, entry))

export type { Expense }
