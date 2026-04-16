import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  href?: string
  children: Snippet
  class?: ClassValue
}
