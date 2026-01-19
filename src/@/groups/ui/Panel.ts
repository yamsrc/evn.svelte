import type { Group } from '@/groups'

interface GroupLike extends Pick<Group, 'id' | 'name' | 'identities'> {
  balance?: number
}

export interface Props {
  group: GroupLike
  selected?: boolean
  onselect?: (id: string, selected: boolean) => void
}
