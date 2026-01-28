import type { Snippet } from 'svelte'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  href?: string
  children: Snippet
  class?: ClassValue
}
