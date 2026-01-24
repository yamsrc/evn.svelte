import type { AccountLike } from './AccountLike'
import type { oidc } from '@/iam'

export interface Props {
  account?: AccountLike
  class?: string
  oidc?: Record<oidc.IDP, boolean>
  oncreate?: (account: AccountLike) => void
}
