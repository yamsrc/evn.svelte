import { track } from '@vercel/analytics'
import { notifications } from '@/notifications/svc/store'
import { internal as groups } from '@/groups/svc/store'
import { favorites } from '@/favorites/svc/store'
import { internal as expenses } from '@/expenses/svc/store'
import { internal as contacts } from '@/contacts/svc/store'
import { adventures } from '@/adventures'
import type { Method } from '@/iam'

export function welcome(_: unknown, method: Method) {
  track('Signup', { method })

  // avoid redundant roundtrips
  notifications.replace([])
  expenses.replace([])
  groups.replace([])
  contacts.replace([])
  favorites.replace([])
  adventures.replace([])
}
