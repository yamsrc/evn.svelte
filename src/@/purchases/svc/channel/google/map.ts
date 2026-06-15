import { currency } from '$lib/tools'
import type { Product } from '../Channel'
import type { Locale } from '$lib/intl'

const TRIAL_PERIOD = /^P\d+[DWMY]$/

export function toProduct(raw: ItemDetails, locale: Locale): Product | null {
  const period = raw.subscriptionPeriod

  if (period !== 'P1M' && period !== 'P1Y') return null

  const minor = Math.round(Number.parseFloat(raw.price.value) * 100)

  const product: Product = {
    id: raw.itemId,
    kind: 'subscription',
    plan: period === 'P1Y' ? 'yearly' : 'monthly',
    period,
    displayName: raw.title,
    displayPrice: currency(minor, locale, raw.price.currency),
    priceString: raw.price.value,
    currencyCode: raw.price.currency,
  }

  if (raw.freeTrialPeriod !== undefined && TRIAL_PERIOD.test(raw.freeTrialPeriod))
    product.trial = { period: raw.freeTrialPeriod, displayPrice: currency(0, locale, raw.price.currency) }

  return product
}

export function toProducts(raw: ItemDetails[], locale: Locale): Product[] {
  const out: Product[] = []

  for (const item of raw) {
    const p = toProduct(item, locale)

    if (p !== null) out.push(p)
  }

  return out
}
