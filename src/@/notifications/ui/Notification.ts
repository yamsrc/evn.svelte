import type { Notification } from '@/notifications'
import type { Component } from 'svelte'

export type Props = {
  notification: Notification
  component: Component
  ondismiss?: (id: string) => void
}
