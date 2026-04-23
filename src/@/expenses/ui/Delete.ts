import type { ComponentProps } from 'svelte'
import type { Hold } from '$com/buttons'

export interface Props extends Omit<ComponentProps<typeof Hold>, 'onclick'> {
  id: string
  ondelete?: () => void
}
