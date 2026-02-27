import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  additional?: Snippet
  class?: string
}

export interface Action {
  id: string
  snippet: Snippet
  additional?: Snippet
  class?: string
}
