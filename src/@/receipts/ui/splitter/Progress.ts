import { claimedUnits } from './claims'
import type { State } from './store'

export function progress(state: State): number {
  const { claimed, total } = statistics(state)

  return total === 0 ? 0 : (claimed / total) * 100
}

export function statistics(state: State): Statistics {
  const items = Object.values(state.items)
  const total = items.reduce((acc, item) => acc + item.quantity, 0)

  if (total === 0)
    return { claimed: 0, total: 0, incomplete: false }

  const claimed = items.reduce((acc, item) => acc + claimedUnits(state, item.id), 0)

  return { claimed, total, incomplete: claimed < total }
}

export interface Statistics {
  claimed: number
  total: number
  incomplete: boolean
}
