// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('$config', () => ({ features: { apple: true, stripe: false } }))

const { channel } = await import('./platform')
const { bridge } = await import('./channel/shell')
const { apple } = await import('./channel/apple')

beforeEach(() => {
  window.webkit = undefined
})

describe('channel selection', () => {
  it('returns the shell-backed channel when the shell handler is present', () => {
    window.webkit = { messageHandlers: { shell: { postMessage: () => {} } } }

    expect(channel()).toBe(bridge)
  })

  it('falls back to the legacy apple channel when the shell handler is absent', () => {
    expect(channel()).toBe(apple)
  })
})
