import type { Product } from '@/purchases'

export interface Props {
  products: Product[]
  selected?: Product | null
  disabled?: boolean
}

interface Plan {
  featured: boolean
  order: number
  months: number
  approx: boolean
}

/** Single source of plan-specific knowledge, keyed by canonical plan. */
export const plans: Record<Product['plan'], Plan> = {
  yearly: { featured: true, order: 0, months: 12, approx: true },
  monthly: { featured: false, order: 1, months: 1, approx: false },
}

export function sort(products: Product[]): Product[] {
  return products.toSorted((a, b) => plans[a.plan].order - plans[b.plan].order)
}

/** Per-month price in minor units (cents). */
export function permonth(product: Product): number {
  return (Number.parseFloat(product.priceString) * 100) / plans[product.plan].months
}

export function featured(products: Product[]): Product | null {
  return sort(products).find((p) => plans[p.plan].featured) ?? products[0] ?? null
}
