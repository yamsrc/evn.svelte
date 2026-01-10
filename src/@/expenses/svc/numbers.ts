import { get } from 'svelte/store'
import { account } from '@/iam'
import type { Expense } from './store'

type Value = Pick<Expense, 'participants' | 'extras'>

export function total({ participants, extras }: Value): number {
  const spent = Object.values(participants).reduce((acc, participant) => acc + participant.amount, 0)
  const extra = extras.reduce((acc, extra) => acc + extra.amount, 0)

  return spent + extra
}

export function paid({ participants }: Value): number {
  return Object.values(participants)
    .reduce((acc, participant) => acc + (participant.paid ?? 0), 0)
}

export function overpaid(value: Value): number {
  return Math.max(paid(value) - total(value), 0)
}

export function balance(value: Value): number {
  const me = get(account)

  if (me === null || value.participants[me.id] === undefined)
    return 0

  const totalSpent = total(value)
  const overpaidAmount = overpaid(value)

  // when the bill is overpaid, excess amount will be added to the extras
  // and should be split among the participants proportionally to their spending
  const bill = totalSpent + overpaidAmount
  const myPercent = percentage(value, me.id)
  const myBill = Math.round(bill * myPercent)
  const iPaid = value.participants[me.id].paid ?? 0

  return iPaid - myBill
}

/**
 * Calculates the percentage of spending relative to other participants
 */
function percentage(value: Value, identity: string): number {
  let me = 0
  let they = 0

  for (const [id, participant] of Object.entries(value.participants))
    if (id === identity) me = participant.amount ?? 0
    else they += participant.amount ?? 0

  if (they === 0)
    if (me === 0) return 1 / Object.values(value.participants).length
    else return 1
  else return me / (they + me)
}
