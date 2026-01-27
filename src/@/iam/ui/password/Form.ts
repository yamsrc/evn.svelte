import type { AccountLike } from '../AccountLike'

export interface Props {
  account?: AccountLike
  oncreate?: (account: AccountLike) => void
}
