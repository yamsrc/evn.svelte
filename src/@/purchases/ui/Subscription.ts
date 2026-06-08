import type { ClassValue } from 'svelte/elements'
import type { Account } from '@/accounts'

export interface Props {
  account: Account & { premium: number }
  class?: ClassValue
}
