import type { ClassValue } from 'svelte/elements'
import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture' | 'premium'>

export interface Props {
  account: AccountLike
  /** @default false */
  managed?: boolean
  /** @default true */
  editable?: boolean
  pictureStyle?: string
  class?: ClassValue
}
