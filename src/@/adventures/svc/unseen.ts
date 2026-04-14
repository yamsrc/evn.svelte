import type { Of } from '@/notifications'
import type { Adventure } from './net'

export function unseen(adventure: Adventure, notifications: Of<'adventures'>[]) {
  return notifications.some((n) => n.key === adventure.id)
}
