import type { Snippet } from 'svelte'
import type { ClassValue } from 'svelte/elements'

export interface Props {
  key: string
  delay?: number
  name?: string
  class?: ClassValue
  children: Snippet
}
