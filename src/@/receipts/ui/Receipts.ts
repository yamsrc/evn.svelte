import type { Receipt } from '@/receipts'
import type { Notification } from '@/notifications'

export interface Props {
  receipts: Receipt[]
  notifications?: Notification[]
}
