import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value?: Value
  placeholder?: string
  label?: string
  note?: string
  class?: string
  autocomplete?: HTMLInputAttributes['autocomplete']
  onchange?: (value: Value) => void | Promise<void>
}

export interface Value {
  name: string
  picture?: string
}
