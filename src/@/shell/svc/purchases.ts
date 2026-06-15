import { request, send } from './transport'

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

/** StoreKit purchase operations exposed through the native shell bridge. */
export const purchases = {
  /** Whether in-app purchases are available on this device/account. */
  async available(): Promise<boolean | Error> {
    const r = await request<boolean>('purchases.available')

    if (r instanceof Error) return r

    return r === true
  },

  /**
   * Fetch product metadata for the given identifiers.
   * @param ids App Store product identifiers
   */
  products(ids: string[]): Promise<Product[] | Error> {
    return request<Product[]>('purchases.products', ids)
  },

  /**
   * Start a purchase flow for a product.
   * @param productID App Store product identifier
   * @param appAccountToken opaque token linking the transaction to the app account
   */
  purchase(productID: string, appAccountToken: string): Promise<Purchase | Error> {
    return request<Purchase>('purchases.purchase', { productID, appAccountToken })
  },

  /** Restore previously completed transactions for the current account. */
  restore(): Promise<Restore | Error> {
    return request<Restore>('purchases.restore')
  },

  /** Open the native subscription management UI. */
  async manage(): Promise<void | Error> {
    const r = await request('purchases.manage')

    if (r instanceof Error) return r
  },

  /**
   * Mark a transaction as finished so StoreKit stops re-delivering it.
   * @param transactionID StoreKit transaction identifier
   */
  finish(transactionID: string): void {
    send('purchases.finish', { transactionID })
  },
}
