import type { ActionProps } from '$com/panel'
import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export type Props = {
  account: AccountLike
  balance?: number
  selected?: boolean
  href?: string
  class?: string
  onselect?: (id: string, selected: boolean) => void
} & ActionProps
