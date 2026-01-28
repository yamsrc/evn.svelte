import type { NotificationComponentFor, NotificationWithComponent } from './components'
import type { ClassValue } from 'svelte/elements'

export type Props<N extends NotificationWithComponent = NotificationWithComponent> = {
  notification: N
  component: NotificationComponentFor<N>
  ondismiss?: (id: string) => void
  class?: ClassValue
}
