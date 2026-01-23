import { Mars, Transgender, Venus, type Icon } from '@lucide/svelte'
import type { Account, Grammar } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'grammar'>

export interface Props {
  account: AccountLike
}

export type Value = Grammar | ''

interface Option {
  value: Value
  Icon: typeof Icon
}

export const options: Option[] = [
  { value: 'he', Icon: Mars },
  { value: 'she', Icon: Venus },
  { value: 'they', Icon: Transgender },
]
