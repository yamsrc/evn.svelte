import type { Snippet } from 'svelte'

export interface Props {
  picked: number
  scroll?: number
  onpick: (index: number) => void
  snap?: 'start' | 'center'
  children: Snippet
  class?: string
}
