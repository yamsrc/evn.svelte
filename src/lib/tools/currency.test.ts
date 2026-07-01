import { describe, it, expect } from 'vitest'
import { unit } from './currency'

describe('unit', () => {
  it('converts major units to cents as integer', () => {
    expect(unit(18.6, 'en-US')).toBe(1860)
    expect(unit(0.1, 'en-US')).toBe(10)
    expect(unit(0.01, 'en-US')).toBe(1)
  })
})
