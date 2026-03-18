import { origin } from '@/net'
import type { Group } from './Group'
import type { Contact } from '@/contacts/svc/net'

const groups = origin.resource<Group>('/groups/', { credentials: 'include' })
// const invitations = origin.resource<Group>('/groups/invitations/', { credentials: 'include' })

export type Initial = Pick<Group, 'name'> & Partial<Pick<Group, 'reduction'>>
export type Editable = Partial<Pick<Group, 'name' | 'reduction'>>

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
