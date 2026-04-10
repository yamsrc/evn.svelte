import type { Snippet } from 'svelte'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'onpointerdown' | 'onkeydown'> {
  name?: string
  duration?: number
  label?: string
  position?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  align?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  onpress?: () => void
  message?: Snippet
}
