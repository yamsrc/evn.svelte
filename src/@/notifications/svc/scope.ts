import { ok } from 'svas'
import { derived, type Readable } from 'svelte/store'
import { notifications } from './store'
import type { Notification, Of } from './net'

type Domain = Notification['domain']
type Event<D extends Domain> = Of<D>['event']

export function scope<D extends Domain, E extends Event<D> | undefined = undefined>(
  { domain, event, key }: { domain: D; event?: E; key?: string },
): Readable<(undefined extends E ? Of<D> : Of<D, E & Event<D>>)[]> {
  return derived(notifications, ($n) =>
    ok($n)
      ? $n.filter((n) =>
        n.domain === domain &&
        (event === undefined || n.event === event) &&
        (key === undefined || n.key === key))
      : [],
  ) as Readable<Of<D, E & Event<D>>[]>
}
