import { get } from 'svelte/store'
import { account } from '@/iam'
import type { Participant } from './net'
import type { Expense } from './store'

type Value = Pick<Expense, 'participants' | 'extras'>

export const MAX_SHARE = 5

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
 * Finds simplest integer shares for participant amounts.
 * E.g., amounts [200, 100] → shares {a: 2, b: 1}.
 *
 * Brute-forces total parts count, checking that candidate shares
 * reconstruct original amounts via `amounts()`.
 */
export function shares(value: Value): Record<string, number> {
  const ids = Object.keys(value.participants)
  const spent = total(value)
  const zeros = Object.fromEntries(ids.map((id) => [id, 0]))

  if (spent === 0) return zeros

  const of = (id: string) => value.participants[id]?.amount ?? 0

  for (let parts = ids.length; parts <= ids.length * MAX_SHARE; parts++) {
    const trial = Object.fromEntries(
      ids.map((id) => [id, Math.round((of(id) / spent) * parts)]),
    )

    const sum = Object.values(trial).reduce((a, b) => a + b, 0)

    // rounding errors — shares don't add up to parts
    if (sum !== parts) continue

    const restored = amounts(value, trial, spent)
    const exact = ids.every((id) => restored[id] === of(id))

    // shares don't reconstruct original amounts
    if (!exact) continue

    return simplify(trial)
  }

  return zeros
}

/**
 * Reduces shares to simplest integer ratio via GCD.
 * E.g., {a: 4, b: 2} → {a: 2, b: 1}
 */
function simplify(record: Record<string, number>): Record<string, number> {
  const positive = Object.values(record).filter((v) => v > 0)
  const g = positive.reduce(gcd)

  return Object.fromEntries(Object.entries(record).map(([k, v]) => [k, v / g]))
}

function gcd(a: number, b: number): number {
  while (b !== 0) [a, b] = [b, a % b]

  return a
}

/**
 * Calculates the amounts of each participant based on their shares.
 *
 * @param value - The expense value (used for participant list)
 * @param shares - Share per participant
 * @param bill - Total amount to distribute
 */
export function amounts(value: Value, shares: Record<string, number>, bill: number): Record<string, number> {
  const parts = Object.values(shares).reduce((acc, share) => acc + share, 0)
  const participants = Object.keys(value.participants)

  if (parts === 0) return Object.fromEntries(participants.map((id) => [id, 0]))

  let sum = 0

  const amounts = Object.fromEntries(
    participants.map((id, i) => {
      const share = shares[id]
      const last = i === participants.length - 1
      const portion = Math.floor((bill / parts) * (share ?? 0))
      const amount = last ? bill - sum : portion

      sum += portion

      return [id, amount]
    }),
  )

  return amounts
}
