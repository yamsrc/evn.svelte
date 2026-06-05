import { origin } from '@/net'
import type { Account } from '@/accounts'
import type { StripeProduct } from '../channel/stripe/Stripe'

export type Purchase = {
  timezone: string
}

const purchases = origin.resource<Account>('/purchases/', { credentials: 'include' })

export async function post(identity: string, body: Purchase): Promise<Account | Error> {
  return purchases.json(identity, { method: 'POST', body })
}

export interface CheckoutSession {
  price: string
  currency: string
  successUrl: string
  cancelUrl: string
}

export const stripe = {
  checkout: {
    resource: origin.resource<StripeProduct[]>('/stripe/checkout/'),
    products: (): Promise<StripeProduct[] | Error> => stripe.checkout.resource.json('products/'),
    session: (identity: string, body: CheckoutSession): Promise<{ url: string } | Error> =>
      stripe.checkout.resource.json<{ url: string }>(`${identity}/`, {
        method: 'POST',
        body,
        credentials: 'include',
      }),
  },
}
