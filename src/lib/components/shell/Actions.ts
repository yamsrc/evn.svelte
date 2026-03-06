import type { Snippet } from 'svelte'
import type { Writable } from 'svelte/store'

export interface Props {
  children: Snippet
  class?: string
  active?: Writable<boolean>
}

export interface Action {
  id: string
  snippet: Snippet
  class?: string
  active?: Writable<boolean>
}
