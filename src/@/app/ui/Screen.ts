import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: ClassValue
}
