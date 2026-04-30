import { describe, it, expect } from 'vitest'
import { formatISODuration } from './date'

describe('formatISODuration', () => {
  it('formats ISO duration', () => {
    expect(formatISODuration('P1Y', 'en-US')).toBe('1 year')
    expect(formatISODuration('P1W', 'en-US')).toBe('1 week')
    expect(formatISODuration('P1M', 'ru-RU')).toBe('1 месяц')
  })
})
