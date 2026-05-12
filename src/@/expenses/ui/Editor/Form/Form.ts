import { get } from 'svelte/store'
import { account } from '@/iam'
import { numbers } from '@/expenses'
import type { Value } from '../Context'

export function normalize(value: Value, mode: 'sums' | 'shares', total: number): Value {
  const shares = Object.fromEntries(Object.entries(value.participants)
    .map(([id, participant]) => [id, participant.shares ?? 0]))

  const amounts = numbers.amounts(value, shares, total)

  const participants = Object.fromEntries(Object.entries(value.participants)
    .map(([id, participant]) => [id, {
      paid: participant.paid,
      comment: participant.comment,
      amount: mode === 'sums' ? participant.amount : amounts[id],
    }]))

  return {
    title: value.title,
    location: value.location,
    participants,
    extras: value.extras.filter((extra) => extra.amount !== 0),
    attachments: value.attachments,
    links: value.links,
    template: value.template,
  }
}

let locked = false

export function autoeffects(value: Value, payers: string[], total: number): void {
  if (locked) return
  else locked = true

  if (payers.length === 1)
    // payer MUST be in participants
    value.participants[payers[0]].paid = total

  if (total === 0)
    return

  const parts = Object.values(value.participants)
    .reduce((acc, participant) => acc + (participant.shares ?? 0), 0)

  if (parts === 0)
    for (const participant of Object.values(value.participants))
      participant.shares = 1

  locked = false
}

export function balance(value: Value, mode: 'sums' | 'shares', total: number): number {
  if (mode === 'sums')
    return numbers.balance(value)

  const shares = Object.fromEntries(Object.entries(value.participants)
    .map(([id, participant]) => [id, participant.shares ?? 0]))

  const parts = Object.values(shares).reduce((acc, share) => acc + share, 0)
  const me = get(account)

  if (me === null || value.participants[me.id] === undefined)
    return 0

  const overpaid = numbers.overpaid(value)
  const bill = total + overpaid

  if (parts === 0)
    return 0

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
