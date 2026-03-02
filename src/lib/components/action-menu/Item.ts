import type { Snippet } from 'svelte'
import type { ClassValue } from 'tailwind-variants'

export interface Props {
  children: Snippet
  onclick: () => void
  id?: string
  class?: ClassValue
}
