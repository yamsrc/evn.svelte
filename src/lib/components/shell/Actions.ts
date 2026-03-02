import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: string
}

export interface Action {
  id: string
  snippet: Snippet
  class?: string
}
