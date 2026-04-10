import { portions } from './Extras'
import type { Receipt } from '@/receipts'
import type { Value as ExpenseValue } from '@/expenses/ui/Editor'
import type { State } from './store'

export interface Props {
  receipt: Receipt
}

export function allDone(receipt: Receipt): boolean {
  return receipt.identities.every((identity) => receipt.done[identity] === true)
}

export function convert(receipt: Receipt, state: State): ExpenseValue {
  return {
    title: receipt.title,
    location: receipt.merchant?.location,
    participants: toParticipants(receipt, state),
    extras: receipt.extras,
    attachments: receipt.attachments,
  }
}

function toParticipants(receipt: Receipt, state: State): ExpenseValue['participants'] {
  const parts = portions(state)

  const extras = receipt.extras
    .filter((extra) => !extra.included)
    .reduce((acc, extra) => acc + extra.amount, 0)

  return Object.fromEntries(Object.entries(parts).map(([identity, part]) => [identity, {
    amount: part.amount + extras * part.portion,
  }]))
}
