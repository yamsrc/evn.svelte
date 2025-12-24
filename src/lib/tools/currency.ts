import type { Locale } from '$lib/intl'

/**
 * Formats a balance value expressed in the currency's ISO 4217 smallest unit
 * (e.g., cents for USD, yen for JPY) into a properly formatted currency string.
 *
 * @param amount - The balance value in the currency's smallest unit (integer)
 * @param currency - Optional ISO 4217 currency code (e.g., 'USD', 'EUR', 'JPY'). Defaults to 'USD'
 * @param locale - Optional locale for formatting. If not provided, uses browser default
 * @returns Formatted currency string (e.g., "$1.00", "€1.00", "¥100")
 */
export function currency(
  amount: number,
  currency?: string,
  locale?: Locale,
): string {
  if (currency === undefined) {
    const value = amount / 100

    return Number.isInteger(value) ? value.toString() : value.toFixed(2)
  }

  const tempFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  const options = tempFormatter.resolvedOptions()
  const decimalPlaces = options.minimumFractionDigits ?? 2
  const divisor = Math.pow(10, decimalPlaces)
  const majorUnit = amount / divisor

  return tempFormatter.format(majorUnit)
}
