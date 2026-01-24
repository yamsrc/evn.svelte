import { having, sync } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { internal } from './store'

export async function add(properties: Input): Promise<net.Expense | Error> {
  const me = await having(account)

  properties.date ??= new Date().toISOString().split('T')[0]

  const expense = await net.post(me.id, properties)

  if (expense instanceof Error) return expense

  sync(internal, expense)

  return expense
}

interface Input extends Partial<net.Post> {
  participants: net.Post['participants']
}
