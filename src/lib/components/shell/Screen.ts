import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: ClassValue
  /** Show ios status bar underlay. Default is true. */
  underlay?: boolean
  /** Do not include safe area. Default is false. */
  unsafe?: boolean
}
