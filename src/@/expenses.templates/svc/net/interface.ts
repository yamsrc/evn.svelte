import { origin } from '@/net'
import type { Template } from './Template'

const templates = origin.resource<Template>('/expenses/templates/', { credentials: 'include' })

export async function get(identity: string): Promise<Template[] | Error> {
  return templates.json(identity)
}

export async function del(identity: string, id: string): Promise<Template | Error> {
  return templates.json(`${identity}/${id}`, { method: 'DELETE' })
}
