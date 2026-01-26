import type { Contact } from '@/contacts/svc'

export interface Props {
  contact: Contact
  selected?: boolean
  highlighted?: boolean
  actionable?: boolean
  onselect?: (id: string, selected: boolean) => void
}
