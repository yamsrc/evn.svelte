import type { Snippet } from 'svelte'
import type { HTMLAttributes } from 'svelte/elements'

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: Snippet
}
