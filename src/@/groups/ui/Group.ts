import type { Group } from '@/groups'

export interface Props {
  group: Group
  balance: number
  selectable?: boolean
  onselect?: (group: Group, selected: boolean) => void
}
