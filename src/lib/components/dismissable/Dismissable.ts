import type { Snippet } from 'svelte'

export interface Props {
  children: Snippet
  ondismiss?: () => Promise<void> | void
  dismissable?: boolean
}
