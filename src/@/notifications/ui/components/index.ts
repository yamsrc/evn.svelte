import { accounts } from './accounts'
import { groups } from './groups'
import type { Notification } from '@/notifications'
import type { Component } from 'svelte'

export const components = { accounts, groups }

type Components = typeof components
type EventsOf<D extends keyof Components> = Extract<keyof Components[D], string>

export type NotificationWithComponent = {
  [D in keyof Components]: {
    [E in EventsOf<D>]: Extract<Notification, { domain: D; event: E }>
  }[EventsOf<D>]
}[keyof Components]

export type NotificationComponent<D extends keyof Components, E extends EventsOf<D>> =
  Components[D][E]

function hasDomain(domain: string): domain is keyof Components {
  return domain in components
}

function hasEvent<D extends keyof Components>(
  domain: D,
  event: PropertyKey,
): event is EventsOf<D> {
  return event in components[domain]
}

export function pickComponent(
  notification: Notification,
): Component | undefined {
  const { domain, event } = notification

  if (!hasDomain(domain)) return undefined

  if (!hasEvent(domain, event)) return undefined

  return components[domain][event]
}
