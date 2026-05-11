import { origin } from '@/net'
import type { Contact } from '@/contacts/svc/net'
import type { Group } from './Group'

const groups = origin.resource<Group>('/groups/', { credentials: 'include' })
// const invitations = origin.resource<Group>('/groups/invitations/', { credentials: 'include' })

export type Initial = Pick<Group, 'name'> & Partial<Pick<Group, 'picture' | 'reduction'>> & { participants?: string[] }
export type Editable = Partial<Pick<Group, 'name' | 'picture' | 'reduction'>>

export async function get(identity: string): Promise<Group[] | Error> {
  return groups.json(identity)
}

export async function post(identity: string, body: Initial): Promise<Group | Error> {
  return groups.json(identity, { method: 'POST', body })
}

export async function add(identity: string, group: string, identities: string[]): Promise<Group | Error> {
  return groups.json(`${identity}/${group}`, { method: 'POST', body: { identities } })
}

export async function patch(identity: string, group: string, body: Editable): Promise<Group | Error> {
  return groups.json(`${identity}/${group}`, { method: 'PATCH', body })
}

export async function del(identity: string, group: string): Promise<void | Error> {
  return groups.json(`${identity}/${group}`, { method: 'DELETE' })
}

export async function expose(identity: string, id: string): Promise<Contact[] | Error> {
  return groups.json(`${identity}/${id}/contacts/`)
}

export const invitations = {
  resource: origin.resource<Group>('/groups/invitations/'),
  get: (id: string) => invitations.resource.json(id),
  del: (id: string) => invitations.resource.json(id, { method: 'DELETE', credentials: 'include' }),
}

export const pictures = {
  resource: origin.resource<{ id: string }>('/groups/pictures'),
  post: (body: File): Promise<{ id: string } | Error> =>
    pictures.resource.json('', { method: 'POST', body, credentials: 'include' }),
}
