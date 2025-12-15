import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: string
  /** Do not include safe area. Default is false. */
  unsafe?: boolean
}
