import type { Account } from '@/accounts'

export interface Props {
  account: Account
  code: string
  accepted?: boolean
  error?: boolean
}
