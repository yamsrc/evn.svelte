import type { Group } from '@/groups/svc/net'

export interface Props {
  group: Group
  accepted?: boolean
  error?: boolean
}
