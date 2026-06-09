import type { AppleProduct, AppleTransactionJson } from './Apple'

declare global {
  interface WebkitMessageHandlers {
    'iap-available'?: { postMessage: () => void }
    'iap-products-request'?: { postMessage: (ids: readonly string[]) => void }
    'iap-purchase-request'?: { postMessage: (i: { productID: string, appAccountToken: string }) => void }
    'iap-restore-request'?: { postMessage: () => void }
    'iap-manage-request'?: { postMessage: () => void }
    'iap-finish-transaction'?: { postMessage: (i: { transactionID: number }) => void }
  }

  interface WindowEventMap {
    'iap-available-result': CustomEvent<{ available: boolean }>
    'iap-products-result': CustomEvent<{ products: AppleProduct[] }>
    'iap-purchase-result': CustomEvent<{ state: string }>
    'iap-transaction-update': CustomEvent<{
      jws: string
      json: AppleTransactionJson
    }>
    'iap-restore-result': CustomEvent<{ transactions: Array<{ jws: string, json: AppleTransactionJson }> }>
    'iap-manage-result': CustomEvent<Record<string, never>>
    'iap-error': CustomEvent<{ kind: string, message: string }>
  }
}
