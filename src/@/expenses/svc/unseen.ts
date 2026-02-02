import type { Expense } from './store'
import type { Notification } from '@/notifications'

export function unseen(expense: Expense, notifications: Notification[]) {
  return notifications.some((n) =>
    (n.domain === 'expenses' && n.key === expense.id) ||
    (n.domain === 'contacts' && n.event === 'transferred' && n.payload?.expense === expense.id),
  )
}

export const sort = (notifications: Notification[]) => (lhs: Expense, rhs: Expense) => {
  if (notifications.length === 0) return 0

  return Number(unseen(rhs, notifications)) - Number(unseen(lhs, notifications))
}
