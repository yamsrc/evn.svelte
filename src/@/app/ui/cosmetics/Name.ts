import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value: string
  busy: boolean
  placeholder?: string
  autocomplete?: HTMLInputAttributes['autocomplete']
  autofocus?: HTMLInputAttributes['autofocus']
  class?: string
  onchange?: (value: string) => void
}
