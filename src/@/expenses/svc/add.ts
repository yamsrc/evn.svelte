import { having, sync } from 'svas'
import { track } from '@vercel/analytics'
import { account } from '@/iam'
import { internal } from './store'
import { total } from './numbers'
import * as net from './net'

export async function add(properties: net.Post): Promise<net.Expense | Error> {
  const me = await having(account)

  // save date in the current timezone
  properties.date ??= new Date().toLocaleDateString('en-CA')

  const expense = await net.post(me.id, properties)

  if (expense instanceof Error) return expense

  sync(internal, expense)
  track('Expense', { total: total(expense) })

  return expense
}
