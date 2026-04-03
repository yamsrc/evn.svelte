import { claimedUnits } from './claims'
import type { State } from './store'

export function progress(state: State): number {
  const { claimed, total } = stats(state)

  return (claimed / total) * 100
}

export function stats(state: State): { claimed: number, total: number } {
  const items = Object.values(state.items)
  const total = items.reduce((acc, item) => acc + item.quantity, 0)

  if (total === 0)
    return { claimed: 0, total: 0 }

  const claimed = items.reduce((acc, item) => acc + claimedUnits(state, item.id), 0)

  return { claimed, total }
}
