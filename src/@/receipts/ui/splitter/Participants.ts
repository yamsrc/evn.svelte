import { unitClaimedBy, unitIdentities } from './claims'
import type { ClassValue } from 'svelte/elements'
import type { Receipt } from '@/receipts'
import type { Props as CoinsProps } from '@/app/ui/Coins'
import type { State } from './store'
import type { AccountLike } from './Splitter'
import type { Statistics } from './Progress'

export interface Props {
  receipt: Receipt
  stats: Statistics
  account: AccountLike
  actor: string
  class?: ClassValue
}

export function claimedCostBy(state: State, identity: string): number {
  let cost = 0

  for (const item of Object.values(state.items))
    for (let i = 0; i < item.quantity; i++)
      if (unitClaimedBy(state, identity, item.id, i)) {
        const identities = unitIdentities(state, item.id, i)

        cost += item.price / identities.length
      }

  return cost
}

export function sign(receipt: Receipt, identity: string): CoinsProps['sign'] {
  if (receipt.done[identity] === true) return 'positive'
  else if (claiming(receipt, identity)) return 'highlight'
  else return 'neutral'
}

export function claiming(receipt: Receipt, identity: string): boolean {
  return receipt.items.some((item) =>
    item.claims.some((claim) => claim.includes(identity)))
}

/**
 * Calculate portions per identity relative to total items cost
 */
export function portions(state: State): Record<string, Portion> {
  const itemsCost = Object.values(state.items).reduce((acc, item) => acc + item.price * item.quantity, 0)

  const extras = state.extras
    .filter((extra) => !extra.included)
    .reduce((acc, extra) => acc + extra.amount, 0)

  const claimedCosts = Object.fromEntries(
    state.identities.map((identity) => [identity, claimedCostBy(state, identity)]))

  return Object.fromEntries(
    state.identities.map((identity) => {
      const claimed = claimedCosts[identity]
      const portion = claimed / itemsCost
      const extra = Math.round(extras * portion)
      const total = claimed + extra

      return [
        identity,
        { claimed, portion, extra, total },
      ]
    }))
}

/**
 * Calculate the proportional amount of extras for identity
 */
export function portionOf(state: State, actor: string): Portion {
  return portions(state)[actor]
}

export interface Portion {
  claimed: number
  portion: number
  extra: number
  total: number
}
