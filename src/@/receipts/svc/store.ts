import { collection, sync, values } from 'svas'
import { writable } from 'svelte/store'
import { account } from '@/iam'
import { events } from '@/realtime'
import { get, list } from './get'
import type { Progress } from './Progress'
import type { Receipt } from './Receipt'

export const progress = writable<Progress | null>(null)

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
