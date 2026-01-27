import { origin } from '@/net'
import type { Notification } from './Notification'

const notifications = origin.resource<Notification>('/notifications/', { credentials: 'include' })

export async function get(identity: string): Promise<Notification[] | Error> {
  return notifications.json(identity)
}

export async function del(identity: string, id: string): Promise<void | Error> {
  return notifications.json(`${identity}/${id}`, { method: 'DELETE' })
}

export async function seen(identity: string, domain: string, key: string): Promise<void | Error> {
  return notifications.json(`${identity}/${domain}/${key}`, { method: 'DELETE' })
}

export async function clear(identity: string): Promise<void | Error> {
  return notifications.json(identity, { method: 'DELETE' })
}
