import type { Account } from '@/accounts'
import type { Props as CosmeticsProps } from '@/app/ui/cosmetics'

type AccountLike = Pick<Account, 'id' | 'name' | 'picture'>

export interface Props extends Omit<CosmeticsProps, 'value' | 'onchange'> {
  account: AccountLike
}
