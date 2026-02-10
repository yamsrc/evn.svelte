import { describe, it, expect, vi } from 'vitest'
import { total, paid, overpaid, split, even, shares, amounts } from './numbers.ts'
import type { Extra, Participant } from '@/expenses'

vi.mock('@/iam', () => ({ account: {} }))
vi.mock('svelte/store', () => ({ get: () => null }))

const value = (
  participants: Record<string, Participant>,
  extras: Extra[] = [],
) => ({ participants, extras })

describe('total', () => {
  it('sums participant amounts', () => {
    expect(total(value({ a: { amount: 100 }, b: { amount: 200 } }))).toBe(300)
  })

  it('includes extras', () => {
    expect(total(value({ a: { amount: 100 } }, [{ amount: 50 }]))).toBe(150)
  })
})

describe('paid', () => {
  it('sums paid values', () => {
    expect(paid(value({ a: { amount: 0, paid: 100 }, b: { amount: 0, paid: 200 } }))).toBe(300)
  })

  it('treats missing paid as 0', () => {
    expect(paid(value({ a: { amount: 100 }, b: { amount: 0, paid: 50 } }))).toBe(50)
  })
})

describe('overpaid', () => {
  it('returns excess when paid > total', () => {
    expect(overpaid(value({ a: { amount: 100, paid: 200 } }))).toBe(100)
  })

  it('returns 0 when paid < total', () => {
    expect(overpaid(value({ a: { amount: 200, paid: 100 } }))).toBe(0)
  })
})

describe('split', () => {
  it('returns empty for no ids', () => {
    expect(split(100, [])).toEqual({})
  })

  it('assigns all to single id', () => {
    expect(split(100, ['a'])).toEqual({ a: 100 })
  })

  it('assigns remainder to last', () => {
    expect(split(100, ['a', 'b', 'c'])).toEqual({ a: 33, b: 33, c: 34 })
  })
})

describe('even', () => {
  it('returns true for single participant', () => {
    expect(even({ a: { amount: 100 } }, ['a'])).toBe(true)
  })

  it('returns false for uneven amounts', () => {
    expect(even({ a: { amount: 30 }, b: { amount: 70 } }, ['a', 'b'])).toBe(false)
  })

  it('returns true for remainder-tolerant split', () => {
    const p = { a: { amount: 33 }, b: { amount: 33 }, c: { amount: 34 } }

    expect(even(p, ['a', 'b', 'c'])).toBe(true)
  })
})

describe('shares', () => {
  it('finds 2:1 ratio', () => {
    expect(shares(value({ a: { amount: 200 }, b: { amount: 100 } }))).toEqual({ a: 2, b: 1 })
  })

  it('returns zeros for all-zero amounts', () => {
    expect(shares(value({ a: { amount: 0 }, b: { amount: 0 } }))).toEqual({ a: 0, b: 0 })
  })

  it('finds 3:2:1 ratio', () => {
    expect(shares(value({ a: { amount: 300 }, b: { amount: 200 }, c: { amount: 100 } }))).toEqual({ a: 3, b: 2, c: 1 })
  })

  it('returns zero for zero alongside non-zero', () => {
    expect(shares(value({ a: { amount: 100 }, b: { amount: 0 } }))).toEqual({ a: 1, b: 0 })
  })

  it('returns zeros when ratio exceeds MAX_SHARE', () => {
    expect(shares(value({ a: { amount: 500 }, b: { amount: 1 } }))).toEqual({ a: 0, b: 0 })
  })

  it('finds 1:2:1 for near-equal split with remainder', () => {
    expect(shares(value({ a: { amount: 1312 }, b: { amount: 2625 }, c: { amount: 1313 } }))).toEqual({ a: 1, b: 2, c: 1 })
  })
})

describe('amounts', () => {
  it('reconstructs from shares', () => {
    const v = value({ a: { amount: 200 }, b: { amount: 100 } })

    expect(amounts(v, { a: 2, b: 1 })).toEqual({ a: 200, b: 100 })
  })

  it('assigns remainder to last participant', () => {
    const v = value({ a: { amount: 33 }, b: { amount: 33 }, c: { amount: 34 } })

    expect(amounts(v, { a: 1, b: 1, c: 1 })).toEqual({ a: 33, b: 33, c: 34 })
  })

  it('assigns nothing for zero share', () => {
    const v = value({ a: { amount: 200 }, b: { amount: 0 } })

    expect(amounts(v, { a: 1, b: 0 })).toEqual({ a: 200, b: 0 })
  })
})
