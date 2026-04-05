import { collection, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { get, list } from './get'
import type { Receipt } from './net'

export const receipts = collection<Receipt>({
  get: list,
  persist: 'receipts',
  bind: account,
  stale: true,
  values: values<Receipt>({
    stale: true,
    get,
  }),
})

events.on('default.receipts.sync', (entry: Receipt) => sync(receipts, entry))
