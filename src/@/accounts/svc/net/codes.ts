import { origin } from '@/net'
import type { Code } from './Code'

const managed = origin.resource('/accounts/managed/', { credentials: 'include' })

export async function post(by: string, to: string): Promise<Code | Error> {
  return managed.json(`${by}/${to}/codes/`, { method: 'POST' })
}
