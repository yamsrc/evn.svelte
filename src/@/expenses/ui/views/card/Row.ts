import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  class?: string
  align?: 'start' | 'center'
}
