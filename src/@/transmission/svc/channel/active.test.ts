// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'

const bridge = { name: 'bridge', available: vi.fn() }
const fcm = { name: 'fcm', available: vi.fn() }
const web = { name: 'web', available: vi.fn() }

vi.mock('./shell', () => ({ bridge }))
vi.mock('./fcm', () => ({ fcm }))
vi.mock('./web', () => ({ web }))

async function bootFresh() {
  vi.resetModules()

  const active = await import('./active')

  await active.boot()

  return active.channel
}

beforeEach(() => {
  bridge.available.mockResolvedValue(false)
  fcm.available.mockResolvedValue(false)
  web.available.mockResolvedValue(false)
})

describe('boot channel selection', () => {
  it('selects the shell bridge when available', async () => {
    bridge.available.mockResolvedValue(true)

    expect(await bootFresh()).toBe(bridge)
  })

  it('falls back to legacy fcm when shell is absent', async () => {
    fcm.available.mockResolvedValue(true)

    expect(await bootFresh()).toBe(fcm)
  })

  it('falls back to web when shell and fcm are absent', async () => {
    web.available.mockResolvedValue(true)

    expect(await bootFresh()).toBe(web)
  })

  it('leaves channel null when nothing is available', async () => {
    expect(await bootFresh()).toBeNull()
  })
})
