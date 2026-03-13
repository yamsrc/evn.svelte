import type { Adventure, Invitation } from '@/adventures/svc/net'

export interface Props {
  adventure: Adventure | Invitation
  link?: boolean
  class?: string
}
