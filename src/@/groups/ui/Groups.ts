import type { Group } from '@/groups'
import type { Notification } from '@/notifications'

export interface Props {
  groups: Group[]
  notifications?: Notification[]
  title?: string
  selection?: Set<string>
}
