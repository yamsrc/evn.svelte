import { ensure, ok } from 'svas'
import { get } from 'svelte/store'
import { account } from '@/iam'
import { net } from './net'
import { notifications } from './store'

export async function del(id: string): Promise<void | Error> {
  const me = ensure(account)

  const current = notifications.extract(id)

  // optimistic
  notifications.delete(id)

  const res = await net.del(me.id, id)

  if (res instanceof Error) {
    if (current !== null) notifications.add(current)

    return res
  }
}

export async function seen(domain: string, key: string): Promise<void | Error> {
  const me = ensure(account)

  const current = get(notifications)

  if (!ok(current)) return

  const candidates = current.filter((n) => n.domain === domain && n.key === key)

  for (const candidate of candidates)
    notifications.delete(candidate.id)

  if (candidates.length > 0)
    return net.seen(me.id, domain, key)
}
