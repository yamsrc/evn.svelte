import type { Method } from '@/iam'
import type { AccountLike } from '../AccountLike'

export interface Props {
  account?: AccountLike
  oncreate?: (account: AccountLike) => void
  onauthenticate?: (method: Method) => void
}
