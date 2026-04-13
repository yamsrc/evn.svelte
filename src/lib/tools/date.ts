import type { Locale } from '$lib/intl'

/**
 * Formats a date string into a short localized representation (e.g., "Feb 17").
 *
 * @param value - ISO date string or Date
 * @param locale - Locale for formatting
 * @returns Formatted date string
 */
export function date(value: string | Date | number, locale: Locale): string {
  const d = typeof value === 'string' ? new Date(value) : value

  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' }).format(d)
}
