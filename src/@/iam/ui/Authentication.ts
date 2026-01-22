import type { AccountLike } from './AccountLike'
import type { IDP } from '@/iam'

export interface Props {
  account?: AccountLike
  class?: string
  oidc?: Record<IDP, boolean>
}
