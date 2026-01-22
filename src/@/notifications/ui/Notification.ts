import type { Notification } from '@/notifications'
import type { Component } from 'svelte'

export type Props = {
  notification: Notification
  component: Component<{ notification: Notification }>
  ondismiss?: (id: string) => void
}
