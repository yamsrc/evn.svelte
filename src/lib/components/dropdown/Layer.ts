import type { Snippet } from 'svelte'

export interface Props {
  /** @default '' */
  name?: string
  children: Snippet
}
