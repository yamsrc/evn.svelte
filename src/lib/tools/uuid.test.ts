import { describe, it, expect } from 'vitest'
import { toUuid } from './uuid'

describe('toUuid', () => {
  it('formats 32-hex into 8-4-4-4-12 UUID shape', () => {
    expect(toUuid('0123456789abcdef0123456789abcdef'))
      .toBe('01234567-89ab-cdef-0123-456789abcdef')
  })

  it('lowercases hex', () => {
    expect(toUuid('0123456789ABCDEF0123456789ABCDEF'))
      .toBe('01234567-89ab-cdef-0123-456789abcdef')
  })

  it('is deterministic', () => {
    const hex = 'deadbeefcafebabe0011223344556677'

    expect(toUuid(hex)).toBe(toUuid(hex))
  })

  it.each([
    ['short', 'abc'],
    ['long', '0123456789abcdef0123456789abcdef00'],
    ['non-hex', '0123456789abcdef0123456789abcdeZ'],
  ])('throws on %s input', (_, input) => {
    expect(() => toUuid(input)).toThrow()
  })
})
