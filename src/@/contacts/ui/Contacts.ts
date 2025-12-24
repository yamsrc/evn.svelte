import type { Contact } from '@/contacts'

export type ContactLike = Pick<Contact, 'id' | 'balance' | 'account'>

export interface Props {
  contacts: ContactLike[]
  title?: string
}
