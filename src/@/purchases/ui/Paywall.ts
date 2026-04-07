import { having } from 'svas'
import { account } from '@/iam'
import { premium } from '@/accounts'
import { open, cta as ctaStore, type CTA } from './store'

export const paywall = async (cta: CTA) => {
  const me = await having(account)

  if (!premium(me)) {
    open.set(true)
    ctaStore.set(cta)
  } else
    cta.callback()
}
