import { writable } from 'svelte/store'
import type { Snippet } from 'svelte'

interface Props {
  children: Snippet
  class?: string
}

interface Action {
  id: string
  snippet: Snippet
  class?: string
}

const actions = writable<Action[]>([])

export { actions }
export type { Props }
