import type { Group } from '@/groups'

export interface Props {
  groups: Group[]
  title?: string
  selection?: Set<string>
  filter?: string
}
