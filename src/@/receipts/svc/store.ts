import { derived } from 'svelte/store'
import { collection, ok, sync, values } from 'svas'
import { events } from '@/realtime'
import { notifications } from '@/notifications'
import { account, type Account } from '@/iam'
import { sort } from './unseen'
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

export const receipts = derived([internal, notifications, account],
  ([internal, notifications, account]) => {
    if (!ok(internal)) return internal

    return internal
      .filter((receipt) => filter(receipt, account))
      .sort(sort(ok(notifications) ? notifications : []))
  })

function filter(receipt: Receipt, account: Account | null) {
  return receipt.status === 'success' &&
    (account === null || receipt.identities.includes(account.id)) // on leave
}

events.on('default.receipts.sync', (entry: Receipt) => sync(internal, entry, { delete: false }))
