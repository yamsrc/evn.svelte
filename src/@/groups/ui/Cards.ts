import type { ClassValue } from 'svelte/elements'
import type { Group } from '@/groups'

export interface Props {
  groups: Group[]
  extended?: boolean
  class?: ClassValue
}
