import type { Locale } from '$lib/intl'

/**
 * Formats a balance value expressed in the currency's ISO 4217 smallest unit
 * (e.g., cents for USD, yen for JPY) into a properly formatted currency string.
 *
 * @param amount - The balance value in the currency's smallest unit (integer)
 * @param locale - Locale for formatting
 * @param currency - Optional ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY').
 * @returns Formatted currency string (e.g., "$1.00", "€1.00", "¥100")
 */
export function currency(amount: number, locale: Locale, currency?: string): string {
  if (currency === undefined) {
    const value = amount / 100
    const precision = value > 500 ? 0 : 2

    return Number.isInteger(value) ? value.toString() : value.toFixed(precision)
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  const options = formatter.resolvedOptions()
  const decimalPlaces = options.minimumFractionDigits ?? 2
  const divisor = Math.pow(10, decimalPlaces)
  const majorUnit = amount / divisor

  return formatter.format(majorUnit)
}

/**
 * Converts a currency value expressed in the currency's ISO 4217 smallest unit
 * (e.g., cents for USD, yen for JPY) into a number.
 *
 * @param amount - The currency value in the currency's smallest unit (integer)
 * @param locale - Locale for formatting
 * @param currency - Optional ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY'). Defaults to 'USD'
 * @returns Number value (e.g., 100 for $1.00, 10000 for ¥100)
 */
export function unit(amount: number, locale: Locale, currency?: string): number {
  if (currency === undefined) return Math.round(amount * 100)

  const tempFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  const options = tempFormatter.resolvedOptions()
  const decimalPlaces = options.minimumFractionDigits ?? 2
  const divisor = Math.pow(10, decimalPlaces)

  return Math.round(amount * divisor)
}
