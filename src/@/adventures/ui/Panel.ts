import type { Adventure, Invitation } from '@/adventures/svc/net'

export interface Props {
  adventure: Adventure | Invitation
  link?: boolean
  highlighted?: boolean
  class?: string
  variant?: string
}
