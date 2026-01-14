import type { Participant } from './net'

/**
 * Splits total evenly among participants using integer arithmetic.
 * Amounts are stored as integers (smallest currency unit per contracts).
 *
 * @param total - The total amount to split
 * @param ids - The IDs of the participants to split the total among
 * @returns A record of participant IDs and their amounts
 */
export function splitEvenly(total: number, ids: string[]): Record<string, number> {
  if (ids.length === 0) return {}

  if (ids.length === 1) return { [ids[0]]: total }

  const baseAmount = Math.floor(total / ids.length)
  const remainder = total % ids.length
  const result: Record<string, number> = {}

  for (const id of ids)
    result[id] = baseAmount

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
export function isEvenlySplit(participants: Record<string, Participant>, ids: string[]): boolean {
  if (ids.length <= 1) return true

  const amounts = ids.map((id) => participants[id]?.amount ?? 0)
  const total = amounts.reduce((sum, amt) => sum + amt, 0)
  const baseAmount = Math.floor(total / ids.length)
  const remainder = total % ids.length

  return amounts.every(
    (amt) => amt === baseAmount || amt === baseAmount + remainder,
  )
}
