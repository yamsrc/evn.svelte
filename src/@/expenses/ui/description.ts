import { date } from '$lib/tools'
import type { Locale } from '$lib/intl'

export function description(event: Event, locale: Locale) {
  return `${event.location === undefined ? '' : `${event.location}, `}${date(event.date, locale)}`
}

interface Event {
  location?: string
  date: string | Date | number
}
