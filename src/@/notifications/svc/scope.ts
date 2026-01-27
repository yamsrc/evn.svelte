import { ok } from 'svas'
import { derived, type Readable } from 'svelte/store'
import { notifications } from './store'
import type { Notification } from './net'

export function scope(domain: Notification['domain'], key?: Notification['key']): Readable<Notification[]> {
  return derived(notifications, ($n) =>
    ok($n)
      ? $n.filter((n) => n.domain === domain && (key === undefined || n.key === key))
      : [],
  )
}
