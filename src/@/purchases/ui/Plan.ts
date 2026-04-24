import type { ClassValue, HTMLAttributes } from 'svelte/elements'
import type { Product } from '@/purchases'

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  product: Product
  class?: ClassValue
}
