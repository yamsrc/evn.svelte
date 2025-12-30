import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value?: Value
  picture?: boolean
  label?: string
  note?: string
  autocomplete?: HTMLInputAttributes['autocomplete']
  onchange?: (value: Value) => void | Promise<void>
}

export interface Value {
  name: string
  picture?: string
}
