import { describe, it, expect, vi } from 'vitest'
import { total, paid, overpaid, split, even, shares, amounts } from './numbers.ts'
import type { Extra } from '@/expenses'

vi.mock('@/iam', () => ({ account: {} }))
vi.mock('svelte/store', () => ({ get: () => null }))

const keys = 'abcde'

const expense = (p: ReturnType<typeof participants>, extras: Extra[] = []) =>
  ({ participants: p, extras })

const participants = (...amounts: number[]) =>
  Object.fromEntries(amounts.map((amount, i) => [keys[i], { amount }]))

const payers = (...pairs: [number, number?][]) =>
  Object.fromEntries(pairs.map(([amount, paid], i) =>
    [keys[i], paid != null ? { amount, paid } : { amount }]))

const record = (...values: number[]) =>
  Object.fromEntries(values.map((v, i) => [keys[i], v]))

describe('total', () => {
  it('sums participant amounts', () => {
    expect(total(expense(participants(100, 200)))).toBe(300)
  })

  it('includes extras', () => {
    expect(total(expense(participants(100), [{ amount: 50 }]))).toBe(150)
  })
})

describe('paid', () => {
  it.each([
    ['sums paid values', payers([0, 100], [0, 200]), 300],
    ['treats missing paid as 0', payers([100], [0, 50]), 50],
  ] as const)('%s', (_, p, expected) => {
    expect(paid(expense(p))).toBe(expected)
  })
})

describe('overpaid', () => {
  it.each([
    ['paid > total → excess', payers([100, 200]), 100],
    ['paid < total → 0', payers([200, 100]), 0],
  ] as const)('%s', (_, p, expected) => {
    expect(overpaid(expense(p))).toBe(expected)
  })
})

describe('split', () => {
  it.each([
    ['no ids → empty', 100, [] as string[], {}],
    ['single id → all', 100, ['a'], record(100)],
    ['remainder to last', 100, ['a', 'b', 'c'], record(33, 33, 34)],
  ])('%s', (_, amount, ids, expected) => {
    expect(split(amount, ids)).toEqual(expected)
  })
})

describe('even', () => {
  it.each([
    ['single participant', participants(100), ['a'], true],
    ['uneven amounts', participants(30, 70), ['a', 'b'], false],
    ['remainder-tolerant', participants(33, 33, 34), ['a', 'b', 'c'], true],
  ] as const)('%s', (_, participants, ids, expected) => {
    expect(even(participants, [...ids])).toBe(expected)
  })
})

describe('shares', () => {
  it.each([
    ['2:1 ratio', participants(200, 100), record(2, 1)],
    ['all zeros', participants(0, 0), record(0, 0)],
    ['3:2:1 ratio', participants(300, 200, 100), record(3, 2, 1)],
    ['zero alongside non-zero', participants(100, 0), record(1, 0)],
    ['exceeds MAX_SHARE → zeros', participants(500, 1), record(0, 0)],
    ['1:2:1 near-equal with remainder', participants(1312, 2625, 1313), record(1, 2, 1)],
  ] as const)('%s', (_, participants, expected) => {
    expect(shares(expense(participants))).toEqual(expected)
  })
})

describe('amounts', () => {
  it.each([
    ['reconstructs from shares', participants(200, 100), record(2, 1), 300, record(200, 100)],
    ['remainder to last', participants(33, 33, 34), record(1, 1, 1), 100, record(33, 33, 34)],
    ['zero share → 0', participants(200, 0), record(1, 0), 200, record(200, 0)],
    ['zeroed sums with explicit total', participants(0, 0), record(1, 1), 100, record(50, 50)],
    ['zeroed sums with unequal shares', participants(0, 0, 0), record(2, 1, 1), 100, record(50, 25, 25)],
    ['all shares zero → all amounts zero', participants(0, 0), record(0, 0), 100, record(0, 0)],
  ] as const)('%s', (_, participants, shares, bill, expected) => {
    expect(amounts(expense(participants), shares, bill)).toEqual(expected)
  })
})
