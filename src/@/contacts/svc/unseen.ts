import type { Contact } from './Contact'
import type { Notification } from '@/notifications'

export function unseen(contact: Contact, notifications: Notification[]) {
  return notifications.some((n) => n.domain === 'contacts' && n.key === contact.identity)
}

export const sort = (notifications: Notification[]) => (lhs: Contact, rhs: Contact) => {
  if (notifications.length === 0) return 0

  return Number(unseen(rhs, notifications)) - Number(unseen(lhs, notifications))
}
