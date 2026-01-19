import { get } from 'svelte/store'
import { numbers } from '@/expenses'
import { account } from '@/iam'
import type { Value } from '../Context'

export function normalize(value: Value, mode: 'sums' | 'shares'): Value {
  const shares = Object.fromEntries(Object.entries(value.participants)
    .map(([id, participant]) => [id, participant.shares ?? 0]))

  const amounts = numbers.amounts(value, shares)

  const participants = mode === 'sums'
    ? value.participants
    : Object.fromEntries(Object.entries(value.participants)
      .map(([id, participant]) => [id, {
        paid: participant.paid,
        comment: participant.comment,
        amount: amounts[id],
      }]))

  return {
    title: value.title,
    location: value.location,
    participants,
    extras: value.extras.filter((extra) => extra.amount !== 0),
  }
}

export function autoeffects(value: Value, payers: string[], total: number): void {
  if (payers.length === 1)
    // payer MUST be in participants
    value.participants[payers[0]].paid = total
}

export function balance(value: Value, mode: 'sums' | 'shares'): number {
  if (mode === 'sums')
    return numbers.balance(value)

  const shares = Object.fromEntries(Object.entries(value.participants)
    .map(([id, participant]) => [id, participant.shares ?? 0]))

  const parts = Object.values(shares).reduce((acc, share) => acc + share, 0)
  const me = get(account)

  if (me === null || value.participants[me.id] === undefined)
    return 0

  const total = numbers.total(value)
  const overpaid = numbers.overpaid(value)
  const bill = total + overpaid
  const myPercent = shares[me.id] / parts
  const myBill = Math.round(bill * myPercent)
  const iPaid = value.participants[me.id].paid ?? 0

  return iPaid - myBill
}

export interface Props {
  value?: Value
  mode?: 'sums' | 'shares'
  onsubmit?: (value: Value) => Promise<void | Error>
}

export type { Value }
