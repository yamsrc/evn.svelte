import { describe, it, expect } from 'vitest'
import { sort, permonth, featured } from './Products'
import type { Product } from '@/purchases'

function product(over: Partial<Product> = {}): Product {
  return {
    id: 'x',
    kind: 'subscription',
    plan: 'monthly',
    period: 'P1M',
    displayName: 'X',
    displayPrice: '€1.99',
    priceString: '1.99',
    currencyCode: 'EUR',
    ...over,
  }
}

const monthly = product({ plan: 'monthly', period: 'P1M', priceString: '1.99' })
const yearly = product({ plan: 'yearly', period: 'P1Y', priceString: '19.99' })

describe('sort', () => {
  it('orders yearly before monthly regardless of input order', () => {
    expect(sort([monthly, yearly]).map((p) => p.plan)).toEqual(['yearly', 'monthly'])
    expect(sort([yearly, monthly]).map((p) => p.plan)).toEqual(['yearly', 'monthly'])
  })
})

describe('permonth', () => {
  it('monthly is full price in cents', () => {
    expect(permonth(monthly)).toBe(199)
  })

  it('yearly is price divided across 12 months', () => {
    expect(permonth(yearly)).toBeCloseTo(166.583, 2)
  })
})

describe('featured', () => {
  it('returns the yearly plan', () => {
    expect(featured([monthly, yearly])?.plan).toBe('yearly')
  })
})
