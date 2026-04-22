import type { ComponentProps } from 'svelte'
import type { Hold } from '$com/buttons'

export interface Props extends ComponentProps<typeof Hold> {
  adventure: string
  id: string
  ondelete?: () => void
}
