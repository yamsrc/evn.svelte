import { accounts } from './accounts'
import { adventures } from './adventures'
import { contacts } from './contacts'
import { expenses } from './expenses'
import { groups } from './groups'
import type { Notification } from '@/notifications'
import type { Component } from 'svelte'

export const components = { accounts, groups, expenses, contacts, adventures } as const

type Map = typeof components
type Domain = keyof Map
type Event<D extends Domain> = keyof Map[D] & string

export type WithComponent = {
  [D in Domain]: { [E in Event<D>]: Extract<Notification, { domain: D; event: E }> }[Event<D>]
}[Domain]
export type ComponentFor<N extends Notification> = Component<{ notification: N }>

export function pick<N extends Notification>(n: N): ComponentFor<N> | undefined {
  const { domain, event } = n

  if (!(domain in components)) return

  const map = components[domain as Domain]

  if (!(event in map)) return

  return map[event as keyof typeof map]
}
