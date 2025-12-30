import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value: string
  busy: boolean
  autocomplete?: HTMLInputAttributes['autocomplete']
  class?: string
  onchange?: (value: string) => void
}
