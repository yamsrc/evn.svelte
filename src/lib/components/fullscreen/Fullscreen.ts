import type { ClassValue } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  /** Fullscreen-only content (not rendered in the trigger). Receives `open`. */
  content?: Snippet<[open: boolean]>
  overlay?: Snippet
  open?: boolean
  onshow?: () => void
  onhide?: () => void
  class?: ClassValue
  /** Close on touch outside. Default is false. */
  fragile?: boolean
  /** Opens manually. Default is false. */
  controlled?: boolean
  /** Show close button. Default is true. */
  x?: boolean
}
