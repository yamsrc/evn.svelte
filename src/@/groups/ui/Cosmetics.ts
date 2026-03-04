import type { Group } from '@/groups'
import type { ClassValue } from 'svelte/elements'

type GroupLike = Pick<Group, 'id' | 'name' | 'reduction'>

export interface Props {
  group?: GroupLike
  reduction?: boolean
  class?: ClassValue
}
