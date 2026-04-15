import { having, sync } from 'svas'
import { track } from '@vercel/analytics'
import { account } from '@/iam'
import { internal } from './store'
import { total } from './numbers'
import * as net from './net'

export async function add(properties: net.Post): Promise<net.Expense | Error> {
  const me = await having(account)

  properties.date ??= new Date().toISOString().split('T')[0]

  const expense = await net.post(me.id, properties)

  if (expense instanceof Error) return expense

  sync(internal, expense)
  track('Expense', { total: total(expense) })

  const receipt = expense.links?.some((link) => link.type === 'receipt') ?? false

  if (receipt) track('Receipts.Completed')

  return expense
}
