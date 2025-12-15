import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  duration?: number
  label?: string
  align?: 'center' | 'left' | 'right'
}
