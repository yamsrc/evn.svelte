import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value?: Value
  onchange?: (value: Value) => void | Promise<void>
  autocomplete?: HTMLInputAttributes['autocomplete']
}

export interface Value {
  name: string
  picture: string
}
