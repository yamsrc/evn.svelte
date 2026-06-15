// Digital Goods API v2.0 (TWA / Play Billing). `PaymentRequest`/`PaymentResponse`
// come from lib.dom; only the DGA surface is declared here.
declare global {
  interface Window {
    getDigitalGoodsService?: (paymentMethod: string) => Promise<DigitalGoodsService>
  }

  interface DigitalGoodsService {
    getDetails(itemIds: string[]): Promise<ItemDetails[]>
    listPurchases(): Promise<PurchaseDetails[]>
    consume(purchaseToken: string): Promise<void>
  }

  interface ItemDetails {
    itemId: string
    title: string
    description: string
    price: PaymentCurrencyAmount
    type?: 'product' | 'subscription'
    subscriptionPeriod?: string
    freeTrialPeriod?: string
    introductoryPrice?: PaymentCurrencyAmount
    introductoryPricePeriod?: string
    introductoryPriceCycles?: number
  }

  interface PurchaseDetails {
    itemId: string
    purchaseToken: string
  }
}

export {}
