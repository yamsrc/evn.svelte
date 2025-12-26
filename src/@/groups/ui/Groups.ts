import type { GroupWithBalance } from './Group'

export interface Props {
  groups: GroupWithBalance[]
  title?: string
  selectable?: boolean
  selection?: GroupWithBalance[]
}
