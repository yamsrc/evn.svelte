import type { Notification } from '@/notifications'
import type { Group } from '@/groups'

export interface Props {
  groups: Group[]
  notifications?: Notification[]
  title?: string
  selection?: Set<string>
}
