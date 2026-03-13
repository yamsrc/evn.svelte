import type { Props as AvatarProps } from './Avatar'

export interface Props extends Omit<AvatarProps, 'account'> {
  identity: string
}
