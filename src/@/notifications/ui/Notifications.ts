import type { Notification } from '@/notifications'

export type Props = {
  notifications: Notification[]
  limit?: number
  ondismiss?: (id: string) => void
  onclear?: () => void
}
