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

export const stripe = {
  checkout: {
    resource: origin.resource<StripeProduct[]>('/stripe/checkout/'),
    products: (): Promise<StripeProduct[] | Error> => stripe.checkout.resource.json('products/'),
  },
}
