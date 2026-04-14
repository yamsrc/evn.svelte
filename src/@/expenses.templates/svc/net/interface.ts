import { origin } from '@/net'
import type { Template } from './Template'

const templates = origin.resource<Template>('/expenses/templates/', { credentials: 'include' })

export async function get(identity: string): Promise<Template[] | Error> {
  return templates.json(identity)
}
