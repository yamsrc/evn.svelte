import type { HTMLInputAttributes } from 'svelte/elements'

export interface Props {
  value?: Partial<Value>
  editable?: boolean
  placeholder?: string
  label?: string
  note?: string
  class?: string
  autocomplete?: HTMLInputAttributes['autocomplete']
  autofocus?: HTMLInputAttributes['autofocus']
  onchange?: (value: Value) => void | Promise<void>
}

export interface Value {
  name: string
  picture: string
}
