import type { Value } from './Context'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  value: Value
  busy: boolean
  class?: ClassValue
}
