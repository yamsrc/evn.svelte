import type { Notification } from '../svc'

export type Props = {
  notification: Notification
  ondismiss?: (id: string) => void
}
