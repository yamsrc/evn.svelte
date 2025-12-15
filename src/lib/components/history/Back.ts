import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  href: string
  name?: string
}
