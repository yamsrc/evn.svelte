import type { net } from '@/contacts'

export interface Props {
  class?: string
  oncreate?: (contact: net.Contact) => void
}
