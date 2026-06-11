// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shell } from './shell'

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

describe('shell.available', () => {
  it('is false when the shell handler is absent', () => {
    expect(shell.available()).toBe(false)
  })

  it('is true when the shell handler is present', () => {
    native()
    expect(shell.available()).toBe(true)
  })
})

describe('shell.purchases.available', () => {
  it('posts label purchases.available and resolves the StoreKit boolean', async () => {
    const post = native()

    const pending = shell.purchases.available()
    const { id } = post.mock.calls[0][0]

    expect(post.mock.calls[0][0]).toMatchObject({ label: 'purchases.available' })
    reply({ kind: 'reply', id, result: true })

    expect(await pending).toBe(true)
  })

  it('maps an error envelope to Error("kind: message")', async () => {
    const post = native()

    const pending = shell.purchases.available()
    const { id } = post.mock.calls[0][0]

    reply({ kind: 'reply', id, error: { kind: 'purchases', message: 'boom' } })

    const result = await pending

    expect(result).toBeInstanceOf(Error)

    if (result instanceof Error) expect(result.message).toBe('purchases: boom')
  })
})
