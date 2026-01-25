import type { Contact } from '@/contacts/svc'

export interface Props {
  contact: Contact
  ondelete?: () => void
}
