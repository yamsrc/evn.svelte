import type { Action } from '$com/panel'
import type { Account } from '@/account'
import type { Snippet } from 'svelte'

export interface Props {
  account: Account
  balance: number
  selected?: boolean
  actions?: Action[]
  action?: Snippet<[string]>
  onselect?: (id: string, selected: boolean) => void
}
