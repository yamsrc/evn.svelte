import { derived } from 'svelte/store'
import { collection, ok, sync, values } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import { get, list } from './get'
import type { Receipt } from './net'

export const internal = collection<Receipt>({
  get: list,
  persist: 'receipts',
  bind: account,
  stale: true,
  values: values<Receipt>({
    stale: true,
    get,
  }),
})

export const receipts = derived(internal, (internal) => {
  if (!ok(internal)) return internal

  return internal.filter((receipt) => receipt.status === 'success')
})

events.on('default.receipts.sync', (entry: Receipt) => sync(internal, entry, { delete: false }))
