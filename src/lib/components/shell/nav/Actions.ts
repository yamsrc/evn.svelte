import type { Writable } from 'svelte/store'
import type { Snippet } from 'svelte'

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
