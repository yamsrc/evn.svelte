import { claimedUnits } from './claims'
import type { State } from './store'

export function progress(state: State): number {
  const items = Object.values(state.items)
  const total = items.reduce((acc, item) => acc + item.quantity, 0)

  if (total === 0)
    return 0

  const claimed = items.reduce((acc, item) => acc + claimedUnits(state, item.id), 0)

  return (claimed / total) * 100
}
