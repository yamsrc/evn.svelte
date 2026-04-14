import { get } from 'svelte/store'
import { time } from '@/realtime'
import type { Account } from './Account'

type AccountLike = Pick<Account, 'premium'>

export function premium(account: AccountLike) {
  return account.premium !== undefined && account.premium > get(time)
}
