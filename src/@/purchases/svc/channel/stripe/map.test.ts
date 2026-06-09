import { describe, it, expect } from 'vitest'
import { toProduct, toProducts } from './map'
import type { StripeProduct } from './Stripe'

function raw(over: Partial<StripeProduct> = {}): StripeProduct {
  return { id: 'price_monthly', name: 'monthly', price: 199, currency: 'EUR', ...over }
}

describe('toProduct', () => {
  it('maps monthly subscription', () => {
    expect(toProduct(raw(), 'en-US')).toMatchObject({
      id: 'price_monthly',
      kind: 'subscription',
      plan: 'monthly',
      period: 'P1M',
      currencyCode: 'EUR',
      priceString: '1.99',
    })
  })

  it('maps yearly subscription', () => {
    expect(toProduct(raw({ id: 'price_yearly', name: 'yearly', price: 1999 }), 'en-US')).toMatchObject({
      id: 'price_yearly',
      plan: 'yearly',
      period: 'P1Y',
      priceString: '19.99',
    })
  })

  it('has no trial', () => {
    expect(toProduct(raw(), 'en-US')).not.toHaveProperty('trial')
  })

  it('formats price in local currency (eur/gbp/usd)', () => {
    expect(toProduct(raw({ price: 1999, currency: 'EUR' }), 'en-US')?.displayPrice).toBe('€19.99')
    expect(toProduct(raw({ price: 1999, currency: 'GBP' }), 'en-US')?.displayPrice).toBe('£19.99')
    expect(toProduct(raw({ price: 1999, currency: 'USD' }), 'en-US')?.displayPrice).toBe('$19.99')
  })

  it('returns null for unknown plan name', () => {
    expect(toProduct(raw({ name: 'weekly' }), 'en-US')).toBeNull()
  })
})

describe('toProducts', () => {
  it('maps array, dropping invalid entries', () => {
    const out = toProducts(
      [raw(), raw({ name: 'weekly' }), raw({ id: 'price_yearly', name: 'yearly', price: 1999 })],
      'en-US',
    )

    expect(out.map((p) => p.plan)).toEqual(['monthly', 'yearly'])
  })

  it('returns empty for empty array', () => {
    expect(toProducts([], 'en-US')).toEqual([])
  })
})
