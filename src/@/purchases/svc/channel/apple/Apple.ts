export interface AppleProduct {
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
      discounts: {
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

export interface AppleTransactionJson {
  id: number
  originalID: number
  productID: string
  appAccountToken?: string
}
