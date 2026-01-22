import type { IDP } from '@/iam'
import type { AccountLike } from './AccountLike'

export interface Props {
  account?: AccountLike
  class?: string
  oidc?: Record<IDP, boolean>
}
