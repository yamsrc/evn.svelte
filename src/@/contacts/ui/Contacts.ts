import type { Contact } from '@/contacts'

export type ContactLike = Pick<Contact, 'id' | 'balance' | 'identity'>

export interface Props {
  contacts: ContactLike[]
  title?: string
  actionable?: boolean
  selection?: Set<string>
}
