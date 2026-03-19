import type { ClassValue } from 'svelte/elements'

export interface Props {
  identities: string[]
  busy?: boolean
  class?: ClassValue
}
