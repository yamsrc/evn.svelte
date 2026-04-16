import type { ClassValue } from 'svelte/elements'

export interface Props {
  value?: string
  identities: string[]
  disabled?: boolean
  onchange?: (value: string | undefined) => void
  id?: string
  class?: ClassValue
}
