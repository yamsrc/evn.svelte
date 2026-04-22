import type { ComponentProps } from 'svelte'
import type { Hold } from '$com/buttons'

export interface Props extends ComponentProps<typeof Hold> {
  id: string
  ondelete?: () => void
}
