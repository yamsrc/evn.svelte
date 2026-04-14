import type { Notification } from '@/notifications'
import type { Group } from './store'

export function unseen(group: Group, notifications: Notification[]) {
  return notifications.some((n) => n.domain === 'groups' && n.key === group.id)
}

export const sort = (notifications: Notification[]) => (lhs: Group, rhs: Group) => {
  if (notifications.length === 0) return 0

  return Number(unseen(rhs, notifications)) - Number(unseen(lhs, notifications))
}
