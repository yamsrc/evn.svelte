import { request, send } from './transport'

// Raw StoreKit `Product.jsonRepresentation` shape — the bridge wire contract.
// Mapped to the domain `Product` by the consuming channel (issue 03).
export interface Product {
  id: string
  href: string
  type: string
  attributes: {
    offerName: string
    name: string
    kind: string
    description: { standard: string }
    icuLocale: string
    isFamilyShareable: number
    offers: {
      type: string
      billingPlanType: string
      recurringSubscriptionPeriod: string
      priceFormatted: string
      priceString: string
      currencyCode: string
      assets: unknown[]
      discounts?: {
        type: string
        modeType: string
        billingPlanType: string
        recurringSubscriptionPeriod: string
        priceFormatted: string
        priceString: string
        numOfPeriods: number
      }[]
    }[]
    subscriptionFamilyId: string
    subscriptionFamilyName: string
    subscriptionFamilyRank: number
  }
}

export interface Purchase {
  state: string
  jws?: string
}

export interface Restore {
  transactions: string[]
}

export const purchases = {
  async available(): Promise<boolean | Error> {
    const r = await request<boolean>('purchases.available')

    if (r instanceof Error) return r

    return r === true
  },

  products(ids: string[]): Promise<Product[] | Error> {
    return request<Product[]>('purchases.products', ids)
  },

  purchase(productID: string, appAccountToken: string): Promise<Purchase | Error> {
    return request<Purchase>('purchases.purchase', { productID, appAccountToken })
  },

  restore(): Promise<Restore | Error> {
    return request<Restore>('purchases.restore')
  },

  async manage(): Promise<void | Error> {
    const r = await request('purchases.manage')

    if (r instanceof Error) return r
  },

  finish(transactionID: string): void {
    send('purchases.finish', { transactionID })
  },
}
