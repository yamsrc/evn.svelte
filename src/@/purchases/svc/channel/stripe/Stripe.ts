/** Wire format from `GET /stripe/checkout/products/`. */
export interface StripeProduct {
  /** Stripe price id (`price_…`); the channel purchase token. */
  id: string
  /** Client plan key from `metadata.id` (`monthly` | `yearly`). */
  name: string
  /** Unit price in smallest currency unit (integer minor units). */
  price: number
  /** ISO 4217 currency code (uppercase). */
  currency: string
}
