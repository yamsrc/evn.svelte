import type { Snippet } from 'svelte'

export interface Props {
  amount: number
  label: string
  children?: Snippet
  class?: string
}
