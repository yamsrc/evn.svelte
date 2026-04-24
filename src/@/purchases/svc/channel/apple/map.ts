import type { Product } from '../Channel'
import type { AppleProduct } from './Apple'

const TRIAL_PERIOD = /^P\d+[DWMY]$/

export function toProduct(raw: AppleProduct): Product | null {
  const attrs = raw.attributes

  if (attrs.kind !== 'Auto-Renewable Subscription') return null

  const buy = attrs.offers.find((o) => o.type === 'buy')

  if (buy === undefined) return null

  const period = buy.recurringSubscriptionPeriod

  if (period !== 'P1M' && period !== 'P1Y') return null

  const product: Product = {
    id: attrs.offerName,
    kind: 'subscription',
    period,
    displayName: attrs.name,
    displayPrice: buy.priceFormatted,
  }

  const intro = buy.discounts.find((d) => d.type === 'IntroOffer')

  if (intro !== undefined && TRIAL_PERIOD.test(intro.recurringSubscriptionPeriod))
    product.trial = { period: intro.recurringSubscriptionPeriod, displayPrice: intro.priceFormatted }

  return product
}

export function toProducts(raw: AppleProduct[]): Product[] {
  const out: Product[] = []

  for (const item of raw) {
    const p = toProduct(item)

    if (p !== null) out.push(p)
  }

  return out
}
