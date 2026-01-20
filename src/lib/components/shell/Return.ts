import type { Snippet } from 'svelte'

export interface Props {
  href?: string
  class?: string
  children?: Snippet
}

export interface Return {
  id: string
  href: string
  class?: string
  children?: Snippet
}
