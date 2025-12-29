import type { Snippet } from 'svelte'

export interface Props {
  title?: string
  actions?: Snippet
  children?: Snippet
  class?: string
}
