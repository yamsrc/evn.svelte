import { origin } from '@/net'
import type { Feedback } from './Feedback'

const feedback = origin.resource('/feedback/', { credentials: 'include' })

export async function post(identity: string, body: Feedback): Promise<void | Error> {
  return await feedback.json(identity, { body })
}
