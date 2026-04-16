import type { ClassValue, HTMLAttributes } from 'svelte/elements'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  direction: 'bottom' | 'top'
  class?: ClassValue
}
