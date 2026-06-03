import type { Event, EventData } from './events'

export function track<E extends Event>(event: E, data?: EventData<E>): void {
  if (data === undefined)
    window.gtag?.({ event })
  else
    window.gtag?.({ event, ...data })
}
