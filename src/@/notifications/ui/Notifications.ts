import type { Notification } from '@/notifications'

export type Props = {
  notifications: Notification[]
  /** Minimum number of notifications to show before collapsing */
  min?: number
  /** Maximum number of notifications to show */
  max?: number
  ondismiss?: (id: string) => void
  onclear?: () => void
}
