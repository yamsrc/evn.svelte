import type { ClassValue } from 'tailwind-variants'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  direction?: 'col' | 'row'
  class?: ClassValue
}
