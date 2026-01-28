import { accounts } from './accounts'
import { contacts } from './contacts'
import { expenses } from './expenses'
import { groups } from './groups'
import type { Notification } from '@/notifications'
import type { Component } from 'svelte'

export const components = { accounts, groups, expenses, contacts } as const

type Components = typeof components
type EventsOf<D extends keyof Components> = Extract<keyof Components[D], string>

export type NotificationWithComponent = {
  [D in keyof Components]: {
    [E in EventsOf<D>]: Extract<Notification, { domain: D; event: E }>
  }[EventsOf<D>]
}[keyof Components]

export type NotificationComponent<D extends keyof Components, E extends EventsOf<D>> =
  Components[D][E]

export type NotificationComponentFor<N extends Notification> = Component<{
  notification: N
}>

function hasDomain(domain: string): domain is keyof Components {
  return domain in components
}

function hasEvent<D extends keyof Components>(
  domain: D,
  event: PropertyKey,
): event is EventsOf<D> {
  return event in components[domain]
}

export function pick<N extends Notification>(
  notification: N,
): NotificationComponentFor<N> | undefined {
  const { domain, event } = notification

  if (!hasDomain(domain)) return

  if (!hasEvent(domain, event)) return

  return components[domain][event]
}
