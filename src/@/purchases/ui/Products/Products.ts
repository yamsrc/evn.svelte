import type { Product } from '@/purchases'

export interface Props {
  products: Product[]
  selected?: Product | null
  disabled?: boolean
}

export const ids = ['premium_monthly', 'premium_yearly']
