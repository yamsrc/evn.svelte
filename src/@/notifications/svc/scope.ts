import { ok } from 'svas'
import { derived, type Readable } from 'svelte/store'
import { notifications } from './store'
import type { Notification } from './net'

type Scope = Partial<Pick<Notification, 'domain' | 'event' | 'key'>>

export function scope({ domain, event, key }: Scope): Readable<Notification[]> {
  return derived(notifications, ($n) =>
    ok($n)
      ? $n.filter((n) =>
        (domain === undefined || n.domain === domain) &&
        (event === undefined || n.event === event) &&
        (key === undefined || n.key === key))
      : [],
  )
}
