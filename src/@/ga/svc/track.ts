import type { EventName, TrackArgs } from './events'

export function track<E extends EventName>(...args: TrackArgs<E>): void {
  const [event, data] = args

  window.gtag?.('event', event, data)
}
