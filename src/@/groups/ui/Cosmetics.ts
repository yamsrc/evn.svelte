import type { Group } from '@/groups'
import type { ClassValue } from 'svelte/elements'

type GroupLike = Pick<Group, 'id' | 'name'>

export interface Props {
  group?: GroupLike
  class?: ClassValue
}
