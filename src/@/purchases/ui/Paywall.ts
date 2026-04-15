import { having } from 'svas'
import { track } from '@vercel/analytics'
import { account } from '@/iam'
import { premium } from '@/accounts'
import { transit } from '$lib/tools'
import { open, cta as ctaStore, type CTA } from './store'

export const paywall = async (cta: CTA) => {
  const me = await having(account)

  if (!premium(me)) {
    ctaStore.set(cta)
    await transit(() => open.set(true))
    track('Paywall', { source: cta.benefit })
  } else
    cta.callback()
}
