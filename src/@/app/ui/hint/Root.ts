import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  key: string
  delay?: number
  name?: string
  class?: ClassValue
  children: Snippet
}
