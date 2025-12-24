import { collection } from 'svas'
import { ensure } from 'svas'
import { derived } from 'svelte/store'
import { type Readable } from 'svelte/store'
import { accounts } from '@/account'
import { account } from '@/iam'
import { get } from './get'
import type { Contact } from './Contact'
import type * as net from './net'

const raw = collection<net.Contact>({
  get,
  persist: 'contacts:contacts',
  bind: account,
  stale: true,
})

export const contacts: Readable<Contact[]> = derived([raw, account], ([$raw, $account]) => {
  if ($raw instanceof Error || $raw === null) return []

  return $raw.map((entry): Contact => {
    const identity = entry.identities.find((identity) => identity !== $account?.id)

    if (identity === undefined) return { ...entry, account: undefined }

    const acc = ensure(accounts.get(identity))

    // Balance is positive when lower identity owes to higher identity
    const [lower] = entry.identities
    const myId = $account?.id
    const isMeLower = myId === lower
    const balance = isMeLower ? -entry.balance : entry.balance

    return { ...entry, balance, account: acc }
  })
})
