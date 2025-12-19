import type { Icon } from '@lucide/svelte'
import type { Snippet } from 'svelte'

export interface Props<T extends string = string> {
  name: string
  value?: string
  options: Option<T>[]
  class?: string
  onchange?: (value: T) => void
}

export interface Option<T extends string = string> {
  value: T
  label?: string | Snippet
  Icon?: typeof Icon
  iconClass?: string
}
