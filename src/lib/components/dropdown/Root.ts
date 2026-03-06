import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  onopen?: (open: boolean) => void
}
