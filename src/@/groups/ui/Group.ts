import type { Group } from '@/groups'

export interface Props {
  group: Group
  selected?: boolean
  onselect?: (id: string, selected: boolean) => void
}
