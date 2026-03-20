import type { ClassValue } from 'svelte/elements'
import type { Value } from './Context'

export interface Props {
  value: Value
  busy: boolean
  class?: ClassValue
}
