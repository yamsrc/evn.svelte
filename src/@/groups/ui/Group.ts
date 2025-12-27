import type { Group } from '@/groups'

export interface GroupWithBalance extends Pick<Group, 'id' | 'name' | 'identities'> {
  balance: number
}

export interface Props {
  group: GroupWithBalance
  selected?: boolean
  onselect?: (id: string, selected: boolean) => void
}
