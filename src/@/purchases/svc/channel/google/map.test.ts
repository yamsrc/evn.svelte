import { describe, it, expect } from 'vitest'
import { toProduct, toProducts } from './map'

function item(overrides: Partial<ItemDetails> = {}): ItemDetails {
  return {
    itemId: 'premium_monthly',
    title: 'Monthly',
    description: 'Monthly subscription',
    type: 'subscription',
    subscriptionPeriod: 'P1M',
    price: { currency: 'EUR', value: '1.99' },
    ...overrides,
  }
}

const monthly = item()

const yearly = item({
  itemId: 'premium_yearly',
  title: 'Yearly',
  subscriptionPeriod: 'P1Y',
  price: { currency: 'EUR', value: '19.99' },
  freeTrialPeriod: 'P1W',
})

describe('toProduct', () => {
  it('maps monthly subscription', () => {
    expect(toProduct(monthly, 'en-US')).toMatchObject({
      id: 'premium_monthly',
      kind: 'subscription',
      period: 'P1M',
      plan: 'monthly',
      displayName: 'Monthly',
      priceString: '1.99',
      currencyCode: 'EUR',
    })
  })

  it('maps yearly subscription with trial', () => {
    expect(toProduct(yearly, 'en-US')).toMatchObject({
      id: 'premium_yearly',
      kind: 'subscription',
      period: 'P1Y',
      plan: 'yearly',
      trial: { period: 'P1W' },
    })
  })

  it('returns null for missing period', () => {
    expect(toProduct(item({ subscriptionPeriod: undefined }), 'en-US')).toBeNull()
  })

  it('returns null for unsupported period', () => {
    expect(toProduct(item({ subscriptionPeriod: 'P1W' }), 'en-US')).toBeNull()
  })

  it('omits trial for invalid free trial period', () => {
    expect(toProduct(item({ freeTrialPeriod: 'garbage' }), 'en-US')).not.toHaveProperty('trial')
  })
})

describe('toProducts', () => {
  it('maps array, dropping invalid entries', () => {
    expect(toProducts([monthly, item({ subscriptionPeriod: undefined }), yearly], 'en-US')).toHaveLength(2)
  })

  it('returns empty for empty array', () => {
    expect(toProducts([], 'en-US')).toEqual([])
  })
})
