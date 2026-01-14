import { get } from 'svelte/store'
import { account } from '@/iam'
import type { Participant } from './net'
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

/**
 * Splits total evenly among participants using integer arithmetic.
 * Amounts are stored as integers (smallest currency unit per contracts).
 *
 * @param total - The total amount to split
 * @param ids - The IDs of the participants to split the total among
 * @returns A record of participant IDs and their amounts
 */
export function split(total: number, ids: string[]): Record<string, number> {
  if (ids.length === 0) return {}

  if (ids.length === 1) return { [ids[0]]: total }

  const base = Math.floor(total / ids.length)
  const remainder = total % ids.length
  const result = Object.fromEntries(ids.map((id) => [id, base]))

  result[ids[ids.length - 1]] += remainder

  return result
}

/**
 * Checks if participant amounts follow even split pattern (remainder-agnostic).
 * Treats amounts as "equal" if they follow the pattern: baseAmount for most,
 * baseAmount + remainder for last participant.
 *
 * @param participants - The participants and their amounts
 * @param ids - The IDs of the participants to check
 * @returns True if the amounts follow the even split pattern, false otherwise
 */
export function even(participants: Record<string, Participant>, ids: string[]): boolean {
  if (ids.length <= 1) return true

  const amounts = ids.map((id) => participants[id]?.amount ?? 0)
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  const base = Math.floor(total / ids.length)
  const remainder = total % ids.length

  return amounts.every(
    (amount) => amount === base || amount === base + remainder,
  )
}
