import { ensure, having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import type { CheckoutSession } from './net'
import type { StripeProduct } from './channel/stripe/Stripe'

export const checkout = {
  products: (): Promise<StripeProduct[] | Error> => net.stripe.checkout.products(),

  async session(body: CheckoutSession): Promise<{ url: string } | Error> {
    const me = ensure(account)

    return net.stripe.checkout.session(me.id, body)
  },

  async portal(returnUrl: string): Promise<{ url: string } | Error> {
    const me = ensure(account)

    return net.stripe.checkout.portal(me.id, { returnUrl })
  },
}

export const transactions = {
  async confirm(session: string): Promise<{ id: string } | Error> {
    const me = await having(account)

    return net.stripe.transactions.confirm(me.id, session)
  },
}
