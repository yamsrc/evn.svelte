import { claimedUnits, unitClaimed, type State } from './claims'
import type { Receipt } from '@/receipts'
import type { Props as CoinsProps } from '@/app/ui/Coins'
import type { Account } from '@/accounts'
import type { Unit } from './groups'

export interface Props {
  receipt: Receipt
  actor: Account
}

export function sign(state: State, unit: Unit, index?: number): CoinsProps['sign'] {
  if (unit.quantity > 1 && index === undefined) {
    const count = claimedUnits(state, unit.item)

    switch (count) {
      case 0:
        return 'neutral'
      case unit.quantity:
        return 'positive'
      default:
        return 'highlight'
    }
  }

  return unitClaimed(state, unit.item, index ?? 0) ? 'positive' : 'neutral'
}
