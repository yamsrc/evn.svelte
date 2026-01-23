import type { NotificationComponentFor, NotificationWithComponent } from './components'

export type Props<N extends NotificationWithComponent = NotificationWithComponent> = {
  notification: N
  component: NotificationComponentFor<N>
}
