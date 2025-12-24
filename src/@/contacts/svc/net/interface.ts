import { origin } from '@/net'
import type { Contact } from './Contact'

const contacts = origin.resource<Contact>('/contacts/', { credentials: 'include' })

export async function get(identity: string): Promise<Contact[] | Error> {
  return contacts.json(identity)
}

export async function post(identity: string, contact: string): Promise<Contact | Error> {
  return contacts.json(identity, { method: 'POST', body: { with: contact } })
}
