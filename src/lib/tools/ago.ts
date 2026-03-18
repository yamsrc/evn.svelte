import type { Locale } from '$lib/intl'

export function ago(timestamp: number, locale: Locale): string {
  const days = Math.round((Date.now() - timestamp) / 86_400_000)

  if (days < 2)
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(-days, 'day')

  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(timestamp)
}
