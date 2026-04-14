import type { Account } from '@/accounts'
import type { ActionProps } from '$com/panel'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture' | 'premium'>

export type Props = {
  account: AccountLike
  balance?: number
  selected?: boolean
  highlighted?: boolean
  neutral?: boolean
  href?: string
  class?: string
  onselect?: (id: string, selected: boolean) => void
} & ActionProps
