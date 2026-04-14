import type { HTMLInputAttributes } from 'svelte/elements'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'onclick'> {
  accept?: HTMLInputAttributes['accept']
  multiple?: HTMLInputAttributes['multiple']
  onfiles?: (files: File[]) => void
}
