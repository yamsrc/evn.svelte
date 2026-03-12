import type { ClassValue } from 'svelte/elements'
import type { ComponentFor, WithComponent } from './components'

export type Props<N extends WithComponent = WithComponent> = {
  notification: N
  component: ComponentFor<N>
  ondismiss?: (id: string) => void
  class?: ClassValue
}
