// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { call, on } from './transport'

function native() {
  const post = vi.fn()

  window.webkit = { messageHandlers: { shell: { postMessage: post } } }

  return post
}

function reply(detail: unknown) {
  window.dispatchEvent(new CustomEvent('shell', { detail }))
}

beforeEach(() => {
  window.webkit = undefined
})

describe('call', () => {
  it('posts { id, label, arguments } to the shell handler', () => {
    const post = native()

    call('purchases.available', undefined, () => {})

    expect(post).toHaveBeenCalledTimes(1)

    const msg = post.mock.calls[0][0]

    expect(msg).toMatchObject({ label: 'purchases.available', arguments: undefined })
    expect(typeof msg.id).toBe('string')
    expect(msg.id.length).toBeGreaterThan(0)
  })

  it('invokes cb with the matching-id reply result', () => {
    const post = native()
    const cb = vi.fn()

    call('purchases.available', undefined, cb)

    const { id } = post.mock.calls[0][0]

    reply({ kind: 'reply', id, result: true })

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb.mock.calls[0][0]).toEqual({ kind: 'reply', id, result: true })
  })

  it('ignores a reply whose id does not match', () => {
    native()

    const cb = vi.fn()

    call('purchases.available', undefined, cb)
    reply({ kind: 'reply', id: 'other-id', result: true })

    expect(cb).not.toHaveBeenCalled()
  })

  it('never invokes cb twice for the same id', () => {
    const post = native()
    const cb = vi.fn()

    call('purchases.available', undefined, cb)

    const { id } = post.mock.calls[0][0]

    reply({ kind: 'reply', id, result: true })
    reply({ kind: 'reply', id, result: false })

    expect(cb).toHaveBeenCalledTimes(1)
  })
})

describe('on', () => {
  it('routes event-kind messages to the label subscriber and not to a pending call', () => {
    native()

    const pending = vi.fn()
    const onEvent = vi.fn()

    call('purchases.available', undefined, pending)
    on('transmission.notification', onEvent)
    reply({ kind: 'event', label: 'transmission.notification', payload: { foo: 1 } })

    expect(onEvent).toHaveBeenCalledTimes(1)

    expect(onEvent.mock.calls[0][0]).toEqual({
      kind: 'event',
      label: 'transmission.notification',
      payload: { foo: 1 },
    })

    expect(pending).not.toHaveBeenCalled()
  })

  it('keeps the subscriber registered across multiple events', () => {
    native()

    const onEvent = vi.fn()

    on('transmission.token', onEvent)
    reply({ kind: 'event', label: 'transmission.token', payload: 'a' })
    reply({ kind: 'event', label: 'transmission.token', payload: 'b' })

    expect(onEvent).toHaveBeenCalledTimes(2)
  })
})
