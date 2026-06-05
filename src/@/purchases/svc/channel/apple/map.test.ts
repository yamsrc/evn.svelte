import { describe, it, expect } from 'vitest'
import { toProduct, toProducts } from './map'
import type { AppleProduct } from './Apple'

function product(overrides: Partial<AppleProduct['attributes']> = {}): AppleProduct {
  return {
    id: '7B2F8C5A-1D4E-4F3B-9A6C-8E2D5F1B3C4A',
    href: '/v1/catalog/usa/in-apps/7B2F8C5A-1D4E-4F3B-9A6C-8E2D5F1B3C4A',
    type: 'in-apps',
    attributes: {
      offerName: 'premium_monthly',
      name: 'Monthly',
      kind: 'Auto-Renewable Subscription',
      description: { standard: 'Monthly subscription' },
      icuLocale: 'en_US@currency=USD',
      isFamilyShareable: 0,
      offers: [
        {
          type: 'buy',
          billingPlanType: 'BILLED_UPFRONT',
          recurringSubscriptionPeriod: 'P1M',
          priceFormatted: '€1.99',
          priceString: '1.99',
          currencyCode: 'EUR',
          assets: [],
          discounts: [],
        },
      ],
      subscriptionFamilyId: '3F1C8E5A-7B2D-4A6E-9F3C-8D5B2E1F4A7C',
      subscriptionFamilyName: 'Evnly Premium',
      subscriptionFamilyRank: 1,
      ...overrides,
    },
  }
}

const monthly = product()

const yearly = product({
  offerName: 'premium_yearly',
  name: 'Yearly',
  subscriptionFamilyRank: 2,
  offers: [
    {
      type: 'buy',
      billingPlanType: 'BILLED_UPFRONT',
      recurringSubscriptionPeriod: 'P1Y',
      priceFormatted: '€19.99',
      priceString: '19.99',
      currencyCode: 'EUR',
      assets: [],
      discounts: [
        {
          type: 'IntroOffer',
          modeType: 'FreeTrial',
          billingPlanType: 'BILLED_UPFRONT',
          recurringSubscriptionPeriod: 'P1W',
          priceFormatted: '€0.00',
          priceString: '0.00',
          numOfPeriods: 1,
        },
      ],
    },
  ],
})

describe('toProduct', () => {
  it('maps monthly subscription', () => {
    expect(toProduct(monthly)).toMatchObject({
      id: 'premium_monthly',
      kind: 'subscription',
      period: 'P1M',
      plan: 'monthly',
      displayName: 'Monthly',
      displayPrice: '€1.99',
    })
  })

  it('maps yearly subscription with trial', () => {
    expect(toProduct(yearly)).toMatchObject({
      id: 'premium_yearly',
      kind: 'subscription',
      period: 'P1Y',
      plan: 'yearly',
      displayName: 'Yearly',
      displayPrice: '€19.99',
      trial: { period: 'P1W', displayPrice: '€0.00' },
    })
  })

  it('returns null for non-subscription kind', () => {
    expect(toProduct(product({ kind: 'Consumable' }))).toBeNull()
  })

  it('returns null when no buy offer', () => {
    expect(toProduct(product({ offers: [] }))).toBeNull()
  })

  it('returns null for unsupported period', () => {
    expect(
      toProduct(
        product({
          offers: [
            {
              type: 'buy',
              billingPlanType: 'BILLED_UPFRONT',
              recurringSubscriptionPeriod: 'P1W',
              priceFormatted: '€1.99',
              priceString: '1.99',
              currencyCode: 'EUR',
              assets: [],
              discounts: [],
            },
          ],
        }),
      ),
    ).toBeNull()
  })

  it('skips trial when IntroOffer period invalid', () => {
    const raw = product({
      offers: [
        {
          type: 'buy',
          billingPlanType: 'BILLED_UPFRONT',
          recurringSubscriptionPeriod: 'P1M',
          priceFormatted: '€1.99',
          priceString: '1.99',
          currencyCode: 'EUR',
          assets: [],
          discounts: [
            {
              type: 'IntroOffer',
              modeType: 'FreeTrial',
              billingPlanType: 'BILLED_UPFRONT',
              recurringSubscriptionPeriod: 'garbage',
              priceFormatted: '€0.00',
              priceString: '0.00',
              numOfPeriods: 1,
            },
          ],
        },
      ],
    })

    expect(toProduct(raw)).not.toHaveProperty('trial')
  })

  it('ignores non-IntroOffer discounts', () => {
    const raw = product({
      offers: [
        {
          type: 'buy',
          billingPlanType: 'BILLED_UPFRONT',
          recurringSubscriptionPeriod: 'P1M',
          priceFormatted: '€1.99',
          priceString: '1.99',
          currencyCode: 'EUR',
          assets: [],
          discounts: [
            {
              type: 'Promotional',
              modeType: 'PayAsYouGo',
              billingPlanType: 'BILLED_UPFRONT',
              recurringSubscriptionPeriod: 'P1M',
              priceFormatted: '€0.99',
              priceString: '0.99',
              numOfPeriods: 3,
            },
          ],
        },
      ],
    })

    expect(toProduct(raw)).not.toHaveProperty('trial')
  })
})

describe('toProducts', () => {
  it('maps array, dropping invalid entries', () => {
    const consumable = product({ kind: 'Consumable' })

    expect(toProducts([monthly, consumable, yearly])).toHaveLength(2)
  })

  it('returns empty for empty array', () => {
    expect(toProducts([])).toEqual([])
  })
})
