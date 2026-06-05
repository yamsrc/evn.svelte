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

  async purchase(_productId: string, _accountId: string): Promise<void | Error> {
    return new Error('stripe: not-implemented')
  },
}
