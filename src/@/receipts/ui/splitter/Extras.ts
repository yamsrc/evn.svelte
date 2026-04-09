import { claimedCostBy } from './Participants'
import type { Receipt } from '@/receipts'
import type { State } from './store'

export interface Props {
  receipt: Receipt
}

/**
 * Calculate portions per identity
 */
export function portions(state: State): Record<string, number> {
  const claimedCosts = Object.fromEntries(
    state.identities.map((identity) => [identity, claimedCostBy(state, identity)]))

  const total = Object.values(claimedCosts).reduce((acc, cost) => acc + cost, 0)

  return Object.fromEntries(
    state.identities.map((identity) => [identity, claimedCosts[identity] / total]))
}

/**
 * Calculate the proportional amount of extras for identity
 */
export function portionOf(state: State, actor: string): number {
  return portions(state)[actor]
}
