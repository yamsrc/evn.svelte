import { having } from 'svas'
import { account } from '@/iam'
import { track } from '@/ga'
import { premium } from '@/accounts'
import { takeoff, transit } from '$lib/tools'
import { open, cta as ctaStore, step, type CTA } from './store'

export const paywall = async (cta: CTA) => {
  const me = await having(account)

  if (!premium(me)) {
    ctaStore.set(cta)
    step.set('offer')

    if (cta.source !== undefined) takeoff(cta.source, 'paywall', 'transition-spring transition-morph')

    await transit(() => open.set(true))
    track('purchases.paywall', { source: cta.benefit })
  } else
    cta.callback()
}
