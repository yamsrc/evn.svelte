import { having, once, value } from 'svas'
import { cap, toUuid } from '$lib/tools'
import { toProducts } from './map'
import type { Channel, Product, Transaction } from '../Channel'
import type { AppleProduct } from './Apple'

const TIMEOUT = 10_000

const IDS = ['premium_monthly', 'premium_yearly'] as const

type Handler =
  | 'iap-available'
  | 'iap-products-request'
  | 'iap-purchase-request'
  | 'iap-restore-request'
  | 'iap-finish-transaction'

type Handlers = Pick<WebkitMessageHandlers, Handler>
type Message<H extends Handler> = Parameters<NonNullable<Handlers[H]>['postMessage']>[0]

type TxUpdate = WindowEventMap['iap-transaction-update']['detail']
type Restored = WindowEventMap['iap-restore-result']['detail']['transactions']
type ApiError = WindowEventMap['iap-error']['detail']

const availability = value<boolean>()
const products = value<AppleProduct[]>()
const purchaseState = value<string>()
const lastTx = value<TxUpdate>()
const restored = value<Restored>()
const lastError = value<ApiError>()

let initialized = false

function init(): void {
  if (initialized) return

  initialized = true

  window.addEventListener('iap-available-result', (e) => {
    console.debug('iap-available-result', e.detail)
    availability.set(e.detail.available)
  })

  window.addEventListener('iap-products-result', (e) => {
    console.debug('iap-products-result', e.detail)
    products.set(e.detail.products)
  })

  window.addEventListener('iap-purchase-result', (e) => {
    console.debug('iap-purchase-result', e.detail)
    purchaseState.set(e.detail.state)
  })

  window.addEventListener('iap-transaction-update', (e) => {
    console.debug('iap-transaction-update', e.detail)
    lastTx.set(e.detail)
  })

  window.addEventListener('iap-restore-result', (e) => {
    console.debug('iap-restore-result', e.detail)
    restored.set(e.detail.transactions)
  })

  window.addEventListener('iap-error', (e) => {
    console.debug('iap-error', e.detail)
    lastError.set(e.detail)
  })
}

function postMessage<H extends Handler>(name: H, msg?: Message<H>): boolean {
  console.debug('postMessage', name, msg)

  const handler = window.webkit?.messageHandlers?.[name]

  if (handler == null) return false

  // `msg as never` satisfies TS (H-union intersects param types to `never`);
  // method-call syntax keeps `this === handler`, required by UserMessageHandler.
  handler.postMessage(msg as never)

  return true
}

function txToTransaction(t: TxUpdate): Transaction {
  return { id: String(t.json.id), productId: t.json.productID, payload: t.jws }
}

function errorFor(kind: string): Error | null {
  const e = lastError.extract()

  if (e === null || e.kind !== kind) return null

  return new Error(`${e.kind}: ${e.message}`)
}

async function race<T>(wait: Promise<T>, kind: string): Promise<T | Error> {
  const err = once(lastError, (e) => e !== null && e.kind === kind)

  const result = await cap(
    Promise.race([
      wait.then((v) => ({ kind: 'ok' as const, v })),
      err.then(() => ({ kind: 'err' as const })),
    ]),
    TIMEOUT,
  )

  if (result === null) return new Error(`${kind}: timeout`)

  if (result.kind === 'err') return errorFor(kind) ?? new Error(`${kind}: unknown`)

  return result.v
}

export const apple: Channel = {
  async available(): Promise<boolean> {
    if (typeof window === 'undefined' || window.webkit?.messageHandlers?.['iap-available'] === undefined)
      return false

    init()
    availability.set(null)
    postMessage('iap-available', undefined)

    const v = await cap(having(availability), TIMEOUT)

    return v === true
  },

  async products(): Promise<Product[] | Error> {
    init()
    products.set(null)
    lastError.set(null)
    postMessage('iap-products-request', IDS)

    const raw = await race(having(products), 'products')

    if (raw instanceof Error) return raw

    return toProducts(raw)
  },

  async purchase(productId: string, accountId: string): Promise<Transaction | Error> {
    init()
    lastTx.set(null)
    purchaseState.set(null)
    lastError.set(null)
    postMessage('iap-purchase-request', { productID: productId, appAccountToken: toUuid(accountId) })

    const state = await race(having(purchaseState), 'purchase')

    if (state instanceof Error) return state

    if (state !== 'success') return new Error(`purchase: ${state}`)

    const tx = lastTx.extract()

    if (tx === null) return new Error('purchase: no-transaction')

    return txToTransaction(tx)
  },

  async restore(): Promise<Transaction[] | Error> {
    init()
    restored.set(null)
    lastError.set(null)
    postMessage('iap-restore-request', undefined)

    const txs = await race(having(restored), 'restore')

    if (txs instanceof Error) return txs

    return txs.map((t) => ({
      id: String(t.json.id),
      productId: t.json.productID,
      payload: t.jws,
    }))
  },

  async finish(transactionId: string): Promise<void> {
    init()
    postMessage('iap-finish-transaction', { transactionID: Number(transactionId) })
  },
}
