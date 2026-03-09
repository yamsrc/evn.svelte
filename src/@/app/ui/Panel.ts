import type { Snippet } from 'svelte'
import type { ClassValue } from 'svelte/elements'

export type Props = {
  children: Snippet
  name?: string
  class?: ClassValue
}
