import type { HTMLAttributes } from 'svelte/elements'
import type { Snippet } from 'svelte'

export interface Props extends HTMLAttributes<HTMLElement> {
  children: Snippet
}
