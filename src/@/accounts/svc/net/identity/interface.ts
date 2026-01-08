import { origin } from '@/net'
import type { Identity } from './Identity'

const accounts = origin.resource<Identity>('/identity/', { credentials: 'include' })

export async function get(authorization: string): Promise<Identity | Error> {
  return await accounts.json({ headers: { authorization }, credentials: 'include' })
}
