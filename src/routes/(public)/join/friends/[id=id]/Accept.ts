import type { Account } from '@/accounts'

export interface Props {
  inviter: Account
  accepted?: boolean
  error?: boolean
}
