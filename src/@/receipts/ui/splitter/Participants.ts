import { unitClaimedBy, unitIdentities } from './claims'
import type { ClassValue } from 'svelte/elements'
import type { Receipt } from '@/receipts'
import type { Props as CoinsProps } from '@/app/ui/Coins'
import type { State } from './store'
import type { AccountLike } from './Splitter'

export interface Props {
  receipt: Receipt
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
