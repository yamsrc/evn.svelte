import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value?: Value
  label?: string
  autocomplete?: HTMLInputAttributes['autocomplete']
  onchange?: (value: Value) => void | Promise<void>
}

export interface Value {
  name: string
  picture: string
}
