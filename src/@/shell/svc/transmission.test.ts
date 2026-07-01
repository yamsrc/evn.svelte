// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { transmission } from './transmission'

function native() {
  const post = vi.fn()

  window.webkit = { messageHandlers: { shell: { postMessage: post } } }

  return post
}

function reply(detail: unknown) {
  window.dispatchEvent(new CustomEvent('shell', { detail }))
}

function sent(post: ReturnType<typeof native>) {
  return post.mock.calls[0][0]
}

beforeEach(() => {
  window.webkit = undefined
})

describe('transmission.address', () => {
  it('posts label transmission.address and returns the token', async () => {
    const post = native()

    const pending = transmission.address()

    expect(sent(post)).toMatchObject({ label: 'transmission.address' })

    reply({ kind: 'reply', id: sent(post).id, result: 'fcm-token' })

    expect(await pending).toBe('fcm-token')
  })

  it('maps an error envelope to Error', async () => {
    const post = native()

    const pending = transmission.address()

    reply({ kind: 'reply', id: sent(post).id, error: { kind: 'address', message: 'no token' } })

    const r = await pending

    expect(r).toBeInstanceOf(Error)

    if (r instanceof Error) expect(r.message).toBe('address: no token')
  })
})

describe('transmission.permission', () => {
  it('posts label transmission.permission and returns the raw state', async () => {
    const post = native()

    const pending = transmission.permission()

    expect(sent(post)).toMatchObject({ label: 'transmission.permission' })

    reply({ kind: 'reply', id: sent(post).id, result: 'authorized' })

    expect(await pending).toBe('authorized')
  })
})

describe('transmission.request', () => {
  it('posts label transmission.request and returns the raw state', async () => {
    const post = native()

    const pending = transmission.request()

    expect(sent(post)).toMatchObject({ label: 'transmission.request' })

    reply({ kind: 'reply', id: sent(post).id, result: 'denied' })

    expect(await pending).toBe('denied')
  })
})

describe('transmission.delete', () => {
  it('sends label transmission.delete fire-and-forget (no reply correlation)', () => {
    const post = native()

    const r = transmission.delete()

    expect(r).toBeUndefined()
    expect(sent(post)).toMatchObject({ label: 'transmission.delete' })
  })
})

describe('transmission.onNotification', () => {
  it('delivers the event payload to the subscriber, not to a pending call', () => {
    native()

    const pending = vi.fn()
    const cb = vi.fn()
    const note = { id: 'n1', title: 'Hi' }

    transmission.address().then(pending)
    transmission.onNotification(cb)
    reply({ kind: 'event', label: 'transmission.notification', payload: note })

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb.mock.calls[0][0]).toEqual(note)
    expect(pending).not.toHaveBeenCalled()
  })
})

describe('transmission.onNotificationClick', () => {
  it('delivers the click event payload to the subscriber', () => {
    native()

    const cb = vi.fn()
    const note = { id: 'n2', action: '/contacts/' }

    transmission.onNotificationClick(cb)
    reply({ kind: 'event', label: 'transmission.notification-click', payload: note })

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb.mock.calls[0][0]).toEqual(note)
  })
})
