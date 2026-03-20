import type { ParticipantsOptions } from './Selector'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'onclick' | 'href'> {
  exclude: string[]
  onadd: (ids: string[]) => void
  options?: ParticipantsOptions
}
