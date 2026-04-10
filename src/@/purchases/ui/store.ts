import { writable } from 'svelte/store'
import type { Icon } from '@lucide/svelte'
import type { BenefitType } from './Benefit'

export type Reason = 'scan' | 'background' | null

export type CTA = {
  benefit: BenefitType
  label: string
  icon: typeof Icon
  callback: () => void
}

const open = writable(false)
const cta = writable<CTA | null>(null)

open.subscribe((open: boolean) => {
  if (!open)
    cta.set(null)
})

export { open, cta }
