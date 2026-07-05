import { describe, expect, it } from 'vitest'
import { cloudinary } from './cloudinary'

describe('cloudinary', () => {
  it('builds image url', () => {
    expect(cloudinary('w_600', 'hero-preview_kbf2qa.webp')).toBe(
      'https://pic.evnly.com/w_600/hero-preview_kbf2qa.webp',
    )
  })
})
