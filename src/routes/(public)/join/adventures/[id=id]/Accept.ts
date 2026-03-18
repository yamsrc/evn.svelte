import type { Account } from '@/accounts'
import type { Invitation } from '@/adventures/svc/net'

export interface Props {
  adventure: Invitation
  inviter?: Account
  accepted?: boolean
  error?: boolean
}
