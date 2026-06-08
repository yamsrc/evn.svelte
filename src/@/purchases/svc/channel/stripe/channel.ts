import { get } from 'svelte/store'
import { locale } from '$lib/intl'
import { features } from '$config'
import * as net from '../../net'
import { toProducts } from './map'
import type { Stripe, Product } from '../Channel'

export const stripe: Stripe = {
  kind: 'stripe',

  async available(): Promise<boolean> {
    return features.stripe
  },

  async products(): Promise<Product[] | Error> {
    const raw = await net.stripe.checkout.products()

    if (raw instanceof Error) return raw

    return toProducts(raw, get(locale))
  },

  async purchase(productId: string, accountId: string): Promise<void | Error> {
    const products = await this.products()

    if (products instanceof Error) return products

    const product = products.find((p) => p.id === productId)

    if (product === undefined) return new Error('stripe: unknown-product')

    const current = window.location.origin + window.location.pathname

    const session = await net.stripe.checkout.session(accountId, {
      price: productId,
      currency: product.currencyCode,
      successUrl: `${current}#session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${current}#checkout=cancel`,
    })

    if (session instanceof Error) return session

    window.location.href = session.url

    return new Promise<void>(() => { })
  },

  async manage(accountId: string): Promise<void | Error> {
    const returnUrl = window.location.origin + window.location.pathname

    const portal = await net.stripe.checkout.portal(accountId, { returnUrl })

    if (portal instanceof Error) return portal

    window.location.href = portal.url

    return new Promise<void>(() => { })
  },
}
