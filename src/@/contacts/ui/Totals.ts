import type { Contact } from '@/contacts'

export interface Props {
  contacts: Contact[]
}

export type Sign = 'positive' | 'negative'
