import { describe, expect, it } from 'vitest'
import { scale } from './Picture'

describe('Picture', () => {
  it('should scale WxH', () => {
    expect(scale('99x99', 1)).toBe('99x99')
    expect(scale('99x99', 2)).toBe('198x198')
  })

  it('should scale WxH!', () => {
    expect(scale('99x99!', 1)).toBe('99x99!')
    expect(scale('99x99!', 2)).toBe('198x198!')
  })

  it('should scale Wx', () => {
    expect(scale('700x', 1)).toBe('700x')
    expect(scale('700x', 2)).toBe('1400x')
  })

  it('should scale xH', () => {
    expect(scale('x500', 1)).toBe('x500')
    expect(scale('x500', 2)).toBe('x1000')
  })
})
