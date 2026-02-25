import { ok } from 'svas'
import { derived, type Readable } from 'svelte/store'
import { notifications } from './store'
import type { Of } from './net'
import type { Scope } from '@/transmission'

type Domain = Scope['domain']

export function scope<D extends Domain>(
  { domain, event, key }: Scope & { domain: D },
): Readable<Of<D>[]> {
  return derived(notifications, ($n) =>
    ok($n)
      ? $n.filter((n) =>
        n.domain === domain &&
        (event === undefined || n.event === event) &&
        (key === undefined || n.key === key))
      : [],
  ) as Readable<Of<D>[]>
}
