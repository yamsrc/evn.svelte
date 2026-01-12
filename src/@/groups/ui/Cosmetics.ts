import type { Group } from '@/groups'

type GroupLike = Pick<Group, 'id' | 'name'>

export interface Props {
  group?: GroupLike
}
