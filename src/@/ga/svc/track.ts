import type { EventName, TrackArgs } from './events'

export function track<E extends EventName>(...args: TrackArgs<E>): void {
  const [event, data] = args

  if (window.gtag !== undefined)
    window.gtag?.('event', event, data)
  else console.debug('ga:track', event, data)
}
