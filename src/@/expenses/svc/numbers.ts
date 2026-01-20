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

/**
 * Calculates normalized shares from participant amounts.
 * Normalizes ratios so the smallest share is always 1.
 *
 * @param value - The expense value
 * @returns A record mapping participant IDs to their normalized share values
 */
export function shares(value: Value): Record<string, number> {
  const totalSpent = total(value)

  if (totalSpent === 0)
    return Object.fromEntries(Object.keys(value.participants).map((id) => [id, 0]))

  const ratios = share(value)
  const ratioValues = Object.values(ratios).filter((r) => r > 0)

  if (ratioValues.length === 0)
    return Object.fromEntries(Object.keys(value.participants).map((id) => [id, 0]))

  const min = Math.min(...ratioValues)

  for (let divisor = min; divisor > 0; divisor--)
    if (ratioValues.every((r) => r % divisor === 0))
      return Object.fromEntries(
        Object.entries(ratios).map(([id, ratio]) => [id, ratio / divisor]),
      )

  return ratios
}

/**
 * Calculates the shares of each participant based on their amounts.
 *
 * @param value - The expense value
 * @returns A record mapping participant IDs to their share values
 */
export function share(value: Value): Record<string, number> {
  const participants = value.participants
  const totalSpent = total(value)

  return Object.fromEntries(
    Object.keys(participants).map((id) => {
      const amount = participants[id]?.amount ?? 0

      return [id, totalSpent > 0 ? Math.max(0, Math.round((amount / totalSpent) * 10)) : 0]
    }),
  )
}

/**
 * Calculates the amounts of each participant based on their shares.
 *
 * @param value - The expense value
 * @returns A record mapping participant IDs to their amounts
 */
export function amounts(value: Value, shares: Record<string, number>): Record<string, number> {
  const parts = Object.values(shares).reduce((acc, share) => acc + share, 0)

  const participants = Object.keys(value.participants)

  const totalSum = total(value)

  let sum = 0

  const amounts = Object.fromEntries(
    participants.map((id, i) => {
      const share = shares[id]
      const last = i === participants.length - 1
      const portion = Math.floor((totalSum / parts) * (share ?? 0))
      const amount = last ? totalSum - sum : portion

      sum += portion

      return [id, amount]
    }),
  )

  return amounts
}
