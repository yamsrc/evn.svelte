import { collection, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { get } from './get'
import type * as net from './net'

export type { Adventure, Expense } from './net'

export const adventures = collection<net.Adventure>({
  get,
  persist: 'adventures',
  bind: account,
  stale: true,
  values: values<net.Adventure>(),
})

events.on('default.adventures.sync', (entry: net.Adventure) => sync(adventures, entry))
events.on('default.adventures.quit', (entry: net.Adventure) => adventures.delete(entry.id))
