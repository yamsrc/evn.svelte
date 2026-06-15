// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest'

const features = vi.hoisted(() => ({ apple: true, stripe: false }))

vi.mock('$config', () => ({ features }))

const { channel } = await import('./platform')
const { bridge } = await import('./channel/shell')
const { apple } = await import('./channel/apple')
const { stripe } = await import('./channel/stripe')

beforeEach(() => {
  window.webkit = undefined
  features.apple = true
  features.stripe = false
})

describe('channel selection', () => {
  it('returns the shell-backed channel when the shell handler is present', () => {
    window.webkit = { messageHandlers: { shell: { postMessage: () => {} } } }

    expect(channel()).toBe(bridge)
  })

  it('falls back to the legacy apple channel when the shell handler is absent', () => {
    expect(channel()).toBe(apple)
  })

  it('does not select shell bridge when apple feature is disabled', () => {
    features.apple = false
    features.stripe = true
    window.webkit = { messageHandlers: { shell: { postMessage: () => {} } } }

    expect(channel()).toBe(stripe)
  })
})
