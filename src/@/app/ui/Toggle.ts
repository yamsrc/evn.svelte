import type { Snippet } from 'svelte'

export interface Props {
  id: string
  label: string
  children?: Snippet
  checked?: boolean
  class?: string
  onchange?: (checked: boolean) => void | Promise<void>
}
