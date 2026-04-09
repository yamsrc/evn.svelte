import { itemsClaimedBy } from './claims'
import type { Receipt } from '@/receipts'
import type { Item, State } from './store'

export interface Props {
  receipt: Receipt
  actor: string
}

interface Line {
  item: Item
  price: number
  numerator: number
  denominator: number
}

export function summarize(state: State, actor: string): Line[] {
  const claims = itemsClaimedBy(state, actor)
  const lines: Line[] = []

  for (const claim of claims) {
    const denominations: Record<string, number> = {}
    const item = state.items[claim.id]

    for (const claimsCount of claim.units) {
      const key = claimsCount.toString()

      denominations[key] ??= 0
      denominations[key] += 1
    }

    let integer = 0

    // extract integers
    for (const [key, num] of Object.entries(denominations)) {
      const denominator = parseInt(key)
      const int = Math.floor(num / denominator)

      integer += int
      denominations[key] -= int * denominator
    }

    if (integer > 0)
      lines.push({
        item,
        numerator: integer,
        denominator: 1,
        price: item.price * integer,
      })

    for (const [key, numerator] of Object.entries(denominations)) {
      const denominator = parseInt(key)

      if (numerator > 0)
        lines.push({
          item,
          numerator,
          denominator,
          price: Math.round(item.price * numerator / denominator),
        })
    }
  }

  return lines
}
