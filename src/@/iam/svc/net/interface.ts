import { Resource } from '@toa.io/origin'
import type { Echo } from './Echo'

const echo = new Resource<Echo>('/accounts/echo/', { credentials: 'include' })

async function get(authorization?: string): Promise<Echo | Error> {
  const options = authorization ? { headers: { authorization } } : undefined

  return echo.get.value(undefined, options)
}

export { get }
