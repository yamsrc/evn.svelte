import type { Contact } from '@/contacts/svc'

export interface Props {
  contact: Contact
  balance?: string
  selected?: boolean
  actionable?: boolean
  highlighted?: boolean
  onselect?: (id: string, selected: boolean) => void
}
