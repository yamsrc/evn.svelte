import { CircleSmall, Mars, Venus, type Icon } from '@lucide/svelte'
import type { Grammar } from '$lib/intl'
import type { Account } from '@/accounts'

type AccountLike = Pick<Account, 'id' | 'name' | 'grammar'>

export interface Props {
  account: AccountLike
  managed?: boolean
  class?: string
}

export type Value = Grammar | ''

interface Option {
  value: Value
  Icon: typeof Icon
}

export const options: Option[] = [
  { value: 'he', Icon: Mars },
  { value: 'she', Icon: Venus },
  { value: 'none', Icon: CircleSmall },
]
