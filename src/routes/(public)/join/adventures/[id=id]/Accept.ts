import type { Invitation } from '@/adventures/svc/net'
import type { Account } from '@/accounts'

export interface Props {
  adventure: Invitation
  inviter?: Account
  accepted?: boolean
  error?: boolean
}
