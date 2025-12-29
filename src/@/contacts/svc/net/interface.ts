import { origin } from '@/net'
import type { Contact } from './Contact'

const contacts = origin.resource<Contact>('/contacts/', { credentials: 'include' })

export async function get(identity: string): Promise<Contact[] | Error> {
  return contacts.json(identity)
}

export type Post = { with: string } | { name: string, picture: string }

export async function post(identity: string, body: Post): Promise<Contact | Error> {
  return contacts.json(identity, { method: 'POST', body })
}

export async function del(identity: string, contact: string): Promise<void | Error> {
  return contacts.json(`${identity}/${contact}`, { method: 'DELETE' })
}
