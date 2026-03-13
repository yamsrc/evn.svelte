import type { Snippet } from 'svelte'
import type { Unit } from './groups'

export interface Props {
  units: Unit[]
  child: Snippet<[unit: Unit, index: number, collapsed: boolean]>
}
