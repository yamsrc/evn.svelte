import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  /** Fullscreen open state; resets the transform when false. */
  open?: boolean
}
