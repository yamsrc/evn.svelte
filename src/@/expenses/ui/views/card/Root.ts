import type { Snippet } from 'svelte'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'children' | 'variant' | 'size'> {
  highlighted?: boolean
  children: Snippet
}
