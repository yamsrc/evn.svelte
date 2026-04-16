import type { ClassValue } from 'tailwind-variants'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  collapsed?: boolean
  min?: number
  class?: ClassValue
}
