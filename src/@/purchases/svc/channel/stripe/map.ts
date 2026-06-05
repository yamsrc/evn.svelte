import { currency } from '$lib/tools'
import type { Product } from '../Channel'
import type { StripeProduct } from './Stripe'
import type { Locale } from '$lib/intl'

function planFor(name: string): Product['plan'] | null {
  if (name === 'monthly' || name === 'yearly') return name

  return null
}

export function toProduct(raw: StripeProduct, locale: Locale): Product | null {
  const plan = planFor(raw.name)

  if (plan === null) return null

  return {
    id: raw.id,
    kind: 'subscription',
    plan,
    period: plan === 'yearly' ? 'P1Y' : 'P1M',
    displayName: raw.name,
    displayPrice: currency(raw.price, locale, raw.currency),
    priceString: String(raw.price / 100),
    currencyCode: raw.currency,
  }
}

export function toProducts(raw: StripeProduct[], locale: Locale): Product[] {
  const out: Product[] = []

  for (const item of raw) {
    const p = toProduct(item, locale)

    if (p !== null) out.push(p)
  }

  return out
}
