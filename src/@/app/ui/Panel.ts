import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export type Props = {
  children: Snippet
  name?: string
  class?: ClassValue
  contentClass?: ClassValue
}
