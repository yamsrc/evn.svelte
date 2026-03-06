import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  name?: string
  duration?: number
  label?: string
  position?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  align?: 'center' | 'left' | 'right' | 'top' | 'bottom'
  onpress?: () => void
}
