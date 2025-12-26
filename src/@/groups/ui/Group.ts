import type { Group } from '@/groups'

export interface GroupWithBalance extends Pick<Group, 'id' | 'name' | 'identities'> {
  balance: number
}

export interface Props {
  group: GroupWithBalance
  selectable?: boolean
  onselect?: (group: GroupWithBalance, selected: boolean) => void
}
