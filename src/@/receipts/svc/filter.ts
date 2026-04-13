import { accounts } from '@/accounts'
import { search } from '$lib/tools'
import type { Receipt } from './net'

export function filter(receipts: Receipt[], query?: string): Receipt[] {
  return search(receipts, query, stringify)
}

function stringify(receipt: Receipt): string {
  const names = receipt.identities.map((identity) => accounts.extract(identity)?.name).filter((name) => name !== undefined).join(' ')

  return [receipt.title ?? '', receipt.merchant?.location, names].join(' ')
}
