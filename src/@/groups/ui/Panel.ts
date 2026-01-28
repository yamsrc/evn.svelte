import type { Group } from '@/groups'

interface GroupLike extends Pick<Group, 'id' | 'identities' | 'label' | 'emoji'> {
  balance?: number
}

export interface Props {
  group: GroupLike
  selected?: boolean
  highlighted?: boolean
  onselect?: (id: string, selected: boolean) => void
}
