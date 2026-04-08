import type { ClassValue } from 'svelte/elements'
import type { Effect } from '@/app'

export interface Props {
  effect: Effect
  /** Optional mask URL+size string. When set, the effect paints only the masked shape. */
  mask?: string
  class?: ClassValue
}
