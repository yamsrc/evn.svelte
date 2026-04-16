import type { Invitation } from '@/receipts/svc/net'
import type { Account } from '@/accounts'

export interface Props {
  receipt: Invitation
  inviter?: Account
  accepted?: boolean
  error?: boolean
}
