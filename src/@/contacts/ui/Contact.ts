import type { Contact } from '@/contacts'

export interface Props {
  contact: Contact
  selected?: boolean
  actionable?: boolean
  selectable?: boolean
  onselect?: (id: string, selected: boolean) => void
}
