import type { ButtonProps } from '$ui/button'

export interface Props extends ButtonProps {
  active?: boolean
  faded?: boolean
  unseen?: boolean
}
