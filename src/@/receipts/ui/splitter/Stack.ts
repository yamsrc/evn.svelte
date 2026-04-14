import type { Snippet } from 'svelte'
import type { MultiUnitGroup, Unit } from './groups'

export interface Props {
  group: MultiUnitGroup
  claimed: boolean
  ontoggle?: () => void
  child: Snippet<[unit: Unit, index: number, collapsed: boolean]>
}
