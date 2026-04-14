import type { ClassValue } from 'svelte/elements'
import type { Value } from './Editor/Context'

export interface Props {
  value: Value
  onchange?: (name: string) => void
  class?: ClassValue
}
