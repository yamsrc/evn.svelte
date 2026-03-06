import type { Group } from '@/groups'

type GroupLike = Pick<Group, 'id' | 'reduction'>

export interface Props {
  group?: GroupLike
  enabled?: boolean
}
