import type { Snippet } from 'svelte'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  children: Snippet
  class?: ClassValue
}
