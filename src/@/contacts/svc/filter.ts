import { search } from '$lib/tools'
import type { ContactWithAccount } from '@/contacts/ui'

export function filter(contacts: ContactWithAccount[], query?: string): ContactWithAccount[] {
  return search(contacts, query, (contact) => contact.account.name)
}
