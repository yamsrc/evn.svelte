import type { Snippet } from 'svelte'
import type { ClassValue } from 'tailwind-variants'

export interface Props {
  children: Snippet
  expanded?: boolean
  min?: number
  class?: ClassValue
}
