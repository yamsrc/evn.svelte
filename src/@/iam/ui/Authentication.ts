import type { oidc } from '@/iam'
import type { Method } from '@/iam'
import type { AccountLike } from './AccountLike'

export interface Props {
  account?: AccountLike
  class?: string
  oidc?: Record<oidc.IDP, boolean>
  oncreate?: (account: AccountLike, method: Method) => void
  onauthenticate?: (method: Method) => void
}
