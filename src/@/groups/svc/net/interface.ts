import { origin } from '@/net'
import type { Group } from './Group'

const groups = origin.resource<Group>('/groups/', { credentials: 'include' })
// const invitations = origin.resource<Group>('/groups/invitations/', { credentials: 'include' })

export type Editable = Pick<Group, 'name'>

export async function get(identity: string): Promise<Group[] | Error> {
  return groups.json(identity)
}

export async function post(identity: string, body: Editable): Promise<Group | Error> {
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

export const invitations = {
  resource: origin.resource<Group>('/groups/invitations/'),
  get: (id: string) => invitations.resource.json(id),
  del: (id: string) => invitations.resource.json(id, { method: 'DELETE', credentials: 'include' }),
}
