import { origin } from '@/net'
import type { Notification } from './Notification'

const notifications = origin.resource<Notification>('/notifications/', { credentials: 'include' })

export async function get(identity: string): Promise<Notification[] | Error> {
  return notifications.json(identity)
}

export async function del(identity: string, id: string): Promise<void | Error> {
  return notifications.json(`${identity}/${id}`, { method: 'DELETE' })
}
