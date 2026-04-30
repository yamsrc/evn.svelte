export interface Product {
  id: string
  kind: 'subscription'
  period: 'P1M' | 'P1Y'
  displayName: string
  displayPrice: string
  priceString: string
  currencyCode: string
  trial?: { period: string, displayPrice: string }
}

export interface Transaction {
  id: string
  productId: string
  payload: string
}

export interface Channel {
  available(): Promise<boolean>
  products(): Promise<Product[] | Error>
  purchase(productId: string, accountId: string): Promise<Transaction | Error>
  restore(): Promise<Transaction[] | Error>
  finish(transactionId: string): Promise<void>
}
