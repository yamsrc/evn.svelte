import { shell } from '@/shell'
import { track } from '@/ga'
import { report, restore as restoreReceipts } from '@/appstore'
import { convert, toUuid } from '$lib/tools'
import { toProducts } from '../apple/map'
import type { Apple, Product } from '../Channel'

const IDS = ['premium_monthly', 'premium_yearly']

function parse(json: string): { transactionId?: unknown } | null {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

// StoreKit transaction id lives in the JWS payload (middle segment); the backend
// `report` returns its own record id, not the StoreKit one needed to `finish`.
function transactionId(jws: string): string | null {
  const payload = jws.split('.')[1]

  if (payload === undefined) return null

  const json = parse(convert.fromBase64Url(payload))

  return typeof json?.transactionId === 'string' ? json.transactionId : null
}

export const bridge: Apple = {
  kind: 'apple',

  async available(): Promise<boolean> {
    return (await shell.purchases.available()) === true
  },

  async products(): Promise<Product[] | Error> {
    const raw = await shell.purchases.products(IDS)

    if (raw instanceof Error) return raw

    return toProducts(raw)
  },

  async purchase(productId: string, accountId: string): Promise<void | Error> {
    const r = await shell.purchases.purchase(productId, toUuid(accountId))

    if (r instanceof Error) return r

    if (r.state !== 'success') return new Error(`purchase: ${r.state}`)

    if (r.jws === undefined) return new Error('purchase: no-transaction')

    const result = await report(r.jws)

    if (result instanceof Error) return result

    const id = transactionId(r.jws)

    if (id !== null) shell.purchases.finish(id)

    track('purchases.completed', { method: 'ios' })
  },

  async restore(): Promise<void | Error> {
    const r = await shell.purchases.restore()

    if (r instanceof Error) return r

    const result = await restoreReceipts(r.transactions)

    if (result instanceof Error) return result
  },

  async manage(): Promise<void | Error> {
    return shell.purchases.manage()
  },

  async finish(transactionId: string): Promise<void> {
    shell.purchases.finish(transactionId)
  },
}
