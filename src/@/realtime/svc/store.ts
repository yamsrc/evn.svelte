import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import { events } from './events'

export const dashboard = writable<Dashboard>({
  status: 'disconnected',
  events: [],
})

if (browser)
  events.on('*', (label, payload) => {
    dashboard.update((dashboard) => {
      dashboard.events.push({ label: label as string, payload })
      dashboard.events = dashboard.events.slice(-128)

      return dashboard
    })
  })

export interface Dashboard {
  status: Status
  events: Event[]
}

export interface Event {
  label: string
  payload?: unknown
}

export type Status = 'disconnected' | 'connecting' | 'connected'
