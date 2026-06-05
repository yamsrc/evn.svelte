export interface Product {
  id: string
  kind: 'subscription'
  plan: 'monthly' | 'yearly'
  period: 'P1M' | 'P1Y'
  displayName: string
  displayPrice: string
  priceString: string
  currencyCode: string
  trial?: { period: string, displayPrice: string }
}

interface Base {
  available(): Promise<boolean>
  products(): Promise<Product[] | Error>
  purchase(productId: string, accountId: string): Promise<void | Error>
}

export interface Apple extends Base {
  kind: 'apple'
  restore(): Promise<void | Error>
  finish(transactionId: string): Promise<void>
}

export interface Stripe extends Base {
  kind: 'stripe'
}

export type Channel = Apple | Stripe
