import type { Adventure } from './net'
import type { Of } from '@/notifications'

export function unseen(adventure: Adventure, notifications: Of<'adventures'>[]) {
  return notifications.some((n) => n.key === adventure.id)
}
