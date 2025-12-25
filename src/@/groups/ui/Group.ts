import type { Group } from '@/groups'

export interface Props {
  group: Group
  selectable?: boolean
  onselect?: (group: Group, selected: boolean) => void
}
