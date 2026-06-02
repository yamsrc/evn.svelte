import type { Method } from '@/iam'
import type { AccountLike } from '../AccountLike'

export interface Props {
  account?: AccountLike
  apple?: boolean
  google?: boolean
  onauthenticate?: (method: Method) => void
}
