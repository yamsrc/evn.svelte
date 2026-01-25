import type { AccountLike } from '../AccountLike'

export interface Props {
  account?: AccountLike
  disabled?: boolean
  oncreate?: (account: AccountLike) => void
}
