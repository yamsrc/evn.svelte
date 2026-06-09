import type { Locale } from '$lib/intl'

/**
 * Formats a date string into a short localized representation (e.g., "Feb 17").
 * The year is included only when it differs from the current year (e.g., "Feb 17, 2027").
 *
 * @param value - ISO date string or Date
 * @param locale - Locale for formatting
 * @returns Formatted date string
 */
export function date(value: string | Date | number, locale: Locale): string {
  const d = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  if (d.getFullYear() !== new Date().getFullYear()) options.year = 'numeric'

  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Formats an ISO duration string into a localized representation (e.g., "1 year", "1 month").
 *
 * @param iso - ISO duration string
 * @param locale - Locale for formatting
 * @returns Formatted duration string
 */
export function formatISODuration(iso: string, locale: Locale): string {
  const match = iso.match(/^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/)

  if (match === null) return iso

  const [, y, mo, w, d, h, mi, s] = match.map((v) => Number.isNaN(Number(v)) ? undefined : Number(v))

  return new Intl.DurationFormat(locale, { style: 'long' })
    .format({ years: y, months: mo, weeks: w, days: d, hours: h, minutes: mi, seconds: s })
}
