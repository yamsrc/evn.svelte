import type { Contact } from '@/contacts/svc'

export interface Props {
  contact: Contact
  selected?: boolean
  actionable?: boolean
  highlighted?: boolean
  onselect?: (id: string, selected: boolean) => void
}
