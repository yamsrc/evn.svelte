import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  onupload: (file: File) => Promise<void>
  /** @default false */
  disabled?: boolean
  class?: ClassValue
  children: Snippet
}
