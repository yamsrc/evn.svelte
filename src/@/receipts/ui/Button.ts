import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'children' | 'onclick'> {
  id?: string
  oncomplete?: (id: string) => void
}
