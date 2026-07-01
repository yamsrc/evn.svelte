// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { purchases } from './purchases'

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

describe('purchases.products', () => {
  it('posts label purchases.products with ids and maps the reply', async () => {
    const post = native()

    const pending = purchases.products(['premium_monthly'])
    const { id } = sent(post)

    expect(sent(post)).toMatchObject({ label: 'purchases.products', arguments: ['premium_monthly'] })

    const list = [{ id: 'premium_monthly' }]

    reply({ kind: 'reply', id, result: list })

    expect(await pending).toEqual(list)
  })

  it('maps an error envelope to Error', async () => {
    const post = native()

    const pending = purchases.products([])

    reply({ kind: 'reply', id: sent(post).id, error: { kind: 'products', message: 'boom' } })

    const r = await pending

    expect(r).toBeInstanceOf(Error)

    if (r instanceof Error) expect(r.message).toBe('products: boom')
  })
})

describe('purchases.purchase', () => {
  it('posts label/args and returns { state, jws }', async () => {
    const post = native()

    const pending = purchases.purchase('premium_yearly', 'token-1')

    expect(sent(post)).toMatchObject({
      label: 'purchases.purchase',
      arguments: { productID: 'premium_yearly', appAccountToken: 'token-1' },
    })

    reply({ kind: 'reply', id: sent(post).id, result: { state: 'success', jws: 'JWS' } })

    expect(await pending).toEqual({ state: 'success', jws: 'JWS' })
  })

  it('returns state only when no jws (e.g. canceled)', async () => {
    const post = native()

    const pending = purchases.purchase('premium_yearly', 'token-1')

    reply({ kind: 'reply', id: sent(post).id, result: { state: 'canceled' } })

    expect(await pending).toEqual({ state: 'canceled' })
  })

  it('maps an error envelope to Error', async () => {
    const post = native()

    const pending = purchases.purchase('premium_yearly', 'token-1')

    reply({ kind: 'reply', id: sent(post).id, error: { kind: 'purchase', message: 'nope' } })

    expect(await pending).toBeInstanceOf(Error)
  })
})

describe('purchases.finish', () => {
  it('sends label/args fire-and-forget (no reply correlation)', () => {
    const post = native()

    const r = purchases.finish('42')

    expect(r).toBeUndefined()

    expect(sent(post)).toMatchObject({
      label: 'purchases.finish',
      arguments: { transactionID: '42' },
    })
  })
})

describe('purchases.restore', () => {
  it('posts label and returns { transactions: jws[] }', async () => {
    const post = native()

    const pending = purchases.restore()

    expect(sent(post)).toMatchObject({ label: 'purchases.restore' })

    reply({ kind: 'reply', id: sent(post).id, result: { transactions: ['a', 'b'] } })

    expect(await pending).toEqual({ transactions: ['a', 'b'] })
  })
})

describe('purchases.manage', () => {
  it('posts label and resolves void on success', async () => {
    const post = native()

    const pending = purchases.manage()

    expect(sent(post)).toMatchObject({ label: 'purchases.manage' })

    reply({ kind: 'reply', id: sent(post).id, result: null })

    expect(await pending).toBeUndefined()
  })

  it('maps an error envelope to Error', async () => {
    const post = native()

    const pending = purchases.manage()

    reply({ kind: 'reply', id: sent(post).id, error: { kind: 'manage', message: 'x' } })

    expect(await pending).toBeInstanceOf(Error)
  })
})
