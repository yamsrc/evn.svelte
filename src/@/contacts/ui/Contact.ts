import type { Contact } from '@/contacts'

export interface Props {
  contact: Contact
  selected?: boolean
  actionable?: boolean
  onselect?: (id: string, selected: boolean) => void
}
