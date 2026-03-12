import type { Props as CosmeticsProps } from '@/app/ui/cosmetics'
import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export interface Props extends Omit<CosmeticsProps, 'value' | 'onchange'> {
  account: AccountLike
  managed?: boolean
}
