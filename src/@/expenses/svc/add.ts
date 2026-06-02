import { having, sync } from 'svas'
import { account } from '@/iam'
import { track } from '@/ga'
import { internal } from './store'
import * as net from './net'

export async function add(properties: net.Post): Promise<net.Expense | Error> {
  const me = await having(account)

  // save date in the current timezone
  properties.date ??= new Date().toLocaleDateString('en-CA')

  const expense = await net.post(me.id, properties)

  if (expense instanceof Error) return expense

  sync(internal, expense)
  track('expenses.created')

  const receipt = expense.links?.some((link) => link.type === 'receipt') ?? false

  if (receipt) track('receipts.completed')

  return expense
}
