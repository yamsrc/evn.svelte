import type { Value } from './Editor/Context'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  value: Value
  onchange?: (name: string) => void
  class?: ClassValue
}
