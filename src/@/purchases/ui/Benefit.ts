import type { ClassValue } from 'svelte/elements'

export const BenefitTypes = ['scan', 'background', 'profile'] as const

export type BenefitType = typeof BenefitTypes[number]

export type Benefit = {
  id: BenefitType
  title: string
  description: string
  picture: string
}

export type Props = {
  benefit: Benefit
  class?: ClassValue
}
