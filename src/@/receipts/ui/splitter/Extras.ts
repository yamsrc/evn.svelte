import { claimedCostBy } from './Participants'
import type { Receipt } from '@/receipts'
import type { State } from './store'
import type { Statistics } from './Progress'

export interface Props {
  receipt: Receipt
  stats: Statistics
}

/**
 * Calculate portions per identity
 */
export function portions(state: State): Record<string, { amount: number, portion: number }> {
  const claimedCosts = Object.fromEntries(
    state.identities.map((identity) => [identity, claimedCostBy(state, identity)]))

  const total = Object.values(claimedCosts).reduce((acc, cost) => acc + cost, 0)

  return Object.fromEntries(
    state.identities.map((identity) => [
      identity,
      { amount: claimedCosts[identity], portion: claimedCosts[identity] / total },
    ]))
}

/**
 * Calculate the proportional amount of extras for identity
 */
export function portionOf(state: State, actor: string): number {
  return portions(state)[actor].portion
}
