import type { Action } from '$com/panel'
import type { Snippet } from 'svelte'

export interface Props {
  id: string
  balance: number
  selected?: boolean
  actions?: Action[]
  action?: Snippet<[string]>
  onselect?: (id: string, selected: boolean) => void
}
