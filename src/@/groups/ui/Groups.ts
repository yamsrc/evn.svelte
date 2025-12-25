import type { Group } from '@/groups'

export type GroupLike = Pick<Group, 'id' | 'name' | 'identities'>

export interface Props {
  groups: GroupLike[]
  title?: string
  selectable?: boolean
  selection?: GroupLike[]
}
