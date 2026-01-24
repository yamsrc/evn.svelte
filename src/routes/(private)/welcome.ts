import { internal as contacts } from '@/contacts/svc/store'
import { internal as expenses } from '@/expenses/svc/store'
import { favorites } from '@/favorites/svc/store'
import { internal as groups } from '@/groups/svc/store'
import { notifications } from '@/notifications/svc/store'

export function welcome() {
  // avoid redundant roundtrips
  notifications.replace([])
  expenses.replace([])
  groups.replace([])
  contacts.replace([])
  favorites.replace([])
}
