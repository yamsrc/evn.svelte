import { describe, expect, it } from 'vitest'
import { cloudinary } from './cloudinary'

describe('cloudinary', () => {
  it('builds image url', () => {
    expect(cloudinary('w_600', 'hero-preview_kbf2qa.webp')).toBe(
      'https://res.cloudinary.com/dl5z4zgth/image/upload/w_600/v1775485895/hero-preview_kbf2qa.webp',
    )
  })
})
