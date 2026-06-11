import { get } from 'svelte/store'
import { report } from '@/googleplay'
import { track } from '@/ga'
import { locale } from '$lib/intl'
import { stores } from '$config'
import { toProducts } from './map'
import type { Google, Product } from '../Channel'

const METHOD = 'https://play.google.com/billing'
const IDS = ['premium_monthly', 'premium_yearly']

async function service(): Promise<DigitalGoodsService | null> {
  if (typeof window === 'undefined' || window.getDigitalGoodsService === undefined) return null

  try {
    return await window.getDigitalGoodsService(METHOD)
  } catch (e: unknown) {
    console.error(e)

    return null
  }
}

export const google: Google = {
  kind: 'google',

  async available(): Promise<boolean> {
    const available = (await service()) !== null

    console.debug('google: available', available)

    return available
  },

  async products(): Promise<Product[] | Error> {
    const svc = await service()

    if (svc === null) return new Error('google: unavailable')

    try {
      const details = await svc.getDetails(IDS)

      console.debug('google: getDetails', details)

      return toProducts(details, get(locale))
    } catch (e) {
      return e instanceof Error ? e : new Error('google: products')
    }
  },

  async purchase(productId: string): Promise<void | Error> {
    let response: PaymentResponse

    try {
      const request = new PaymentRequest(
        [{ supportedMethods: METHOD, data: { sku: productId } }],
        { total: { label: 'Total', amount: { currency: 'USD', value: '0' } } },
      )

      response = await request.show()
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return

      return e instanceof Error ? e : new Error('google: purchase')
    }

    const token: unknown = response.details?.purchaseToken

    if (typeof token !== 'string') {
      await response.complete('fail')

      return new Error('google: no-token')
    }

    const result = await report(token)

    console.debug('google: report', result)

    if (result instanceof Error) {
      await response.complete('fail')

      return result
    }

    await response.complete('success')

    track('purchases.completed', { method: 'google' })
  },

  async restore(): Promise<void | Error> {
    const svc = await service()

    if (svc === null) return new Error('google: unavailable')

    let purchases: PurchaseDetails[]

    try {
      purchases = await svc.listPurchases()
    } catch (e) {
      return e instanceof Error ? e : new Error('google: restore')
    }

    console.debug('google: listPurchases', purchases)

    for (const p of purchases) {
      const result = await report(p.purchaseToken)

      console.debug('google: restore report', p.itemId, result)

      if (result instanceof Error) return result
    }
  },

  async manage(): Promise<void | Error> {
    window.open(stores.googlePlaySubscriptions, '_blank')
  },
}
