import { get } from 'svelte/store'
import { having } from 'svas'
import { time } from '@/realtime'
import { account } from '@/iam'
import { open, cta as ctaStore, type CTA } from './store'

export const paywall = async (cta: CTA) => {
  const me = await having(account)

  if (me.premium === undefined || me.premium < get(time)) {
    open.set(true)
    ctaStore.set(cta)
  } else
    cta.callback()
}
