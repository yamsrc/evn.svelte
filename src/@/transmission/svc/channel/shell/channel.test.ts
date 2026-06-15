// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'

let clickCb: ((n: { action?: string }) => void) | undefined

const transmission = {
  address: vi.fn(),
  permission: vi.fn(),
  request: vi.fn(),
  delete: vi.fn(),
  onNotification: vi.fn(),
  onNotificationClick: vi.fn((cb) => { clickCb = cb }),
}

const available = vi.fn(() => true)

vi.mock('@/shell', () => ({ shell: { available: () => available(), transmission } }))

const { bridge } = await import('./channel')

beforeEach(() => {
  clickCb = undefined
  available.mockReturnValue(true)
})

describe('shell transmission channel', () => {
  it('navigates to the notification action on click', async () => {
    await bridge.available()

    expect(clickCb).toBeDefined()

    clickCb?.({ action: '/contacts/abc' })

    expect(window.location.href).toContain('/contacts/abc')
  })

  it('subscribe returns the backend fcm channel with the token endpoint', async () => {
    transmission.address.mockResolvedValue('fcm-token')

    expect(await bridge.subscribe()).toEqual({ channel: 'fcm', endpoint: 'fcm-token' })
  })

  it('subscribe surfaces an address error', async () => {
    transmission.address.mockResolvedValue(new Error('no token'))

    expect(await bridge.subscribe()).toBeInstanceOf(Error)
  })

  it('maps native permission state to NotificationPermission', async () => {
    transmission.permission.mockResolvedValue('authorized')

    expect(await bridge.permission()).toBe('granted')
  })

  it('available is false without the shell handler', async () => {
    available.mockReturnValue(false)

    expect(await bridge.available()).toBe(false)
  })
})
