import type { Snippet } from 'svelte'
import type { Unit } from './Splitter'

export interface Props {
  units: Unit[]
  child: Snippet<[unit: Unit, collapsed: boolean]>
}
