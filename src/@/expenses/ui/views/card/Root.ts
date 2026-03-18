import type { ButtonProps } from '$ui/button'
import type { Snippet } from 'svelte'

export interface Props extends Omit<ButtonProps, 'children' | 'variant' | 'size'> {
  highlighted?: boolean
  children: Snippet
}
