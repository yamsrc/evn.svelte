import type { ClassValue } from 'svelte/elements'

export interface Props {
  id?: string
  value?: number
  placeholder?: string
  autofocus?: boolean
  class?: ClassValue
  inputClass?: ClassValue
  oninput?: (value: number) => void
}
