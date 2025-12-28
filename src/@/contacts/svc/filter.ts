import { search } from '$lib/tools'
import type { Contact } from '@/contacts/svc'

export function filter(contacts: Contact[], query?: string): Contact[] {
  return search(contacts, query, (contact) => contact.account?.name)
}
