import type { ButtonProps } from '$ui/button'
import type { ParticipantsOptions } from './Selector'

export interface Props extends Omit<ButtonProps, 'onclick' | 'href'> {
  exclude: string[]
  onadd: (ids: string[]) => void
  options?: ParticipantsOptions
}
