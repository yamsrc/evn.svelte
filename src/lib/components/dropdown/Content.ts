import type { ClassValue } from 'tailwind-variants'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: ClassValue
  position?: 'start-top' | 'start-bottom' | 'end-top' | 'end-bottom'
}
