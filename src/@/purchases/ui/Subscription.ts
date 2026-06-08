import type { ClassValue } from 'svelte/elements'
import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'processor'> & { premium: number }

export interface Props {
  account: AccountLike
  class?: ClassValue
}
