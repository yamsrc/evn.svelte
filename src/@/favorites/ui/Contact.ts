import type { Contact } from '@/contacts'

export interface Props {
  contact: Contact
  selected?: boolean
  onselect?: (id: string, selected: boolean) => void
  class?: string
}
