import type { Notification } from '@/notifications'
import type { Receipt } from './net'

export function unseen(receipt: Receipt, notifications: Notification[]) {
  return notifications.some((n) =>
    (n.domain === 'receipts' && n.key === receipt.id),
  )
}

export const sort = (notifications: Notification[]) => (lhs: Receipt, rhs: Receipt) => {
  if (notifications.length === 0) return 0

  return Number(unseen(rhs, notifications)) - Number(unseen(lhs, notifications))
}
