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
  onchange?: (value: Value) => Promise<void>
  onupload?: (file: File) => Promise<void>
  pictureStyle?: string
}

export interface Value {
  name: string
  picture: string
}
