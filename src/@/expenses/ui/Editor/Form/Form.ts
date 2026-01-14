import { numbers } from '@/expenses'
import type { Value } from '../Context'

export function normalize(value: Value): Value {
  const normalized: Value = {
    title: value.title,
    location: value.location,
    participants: value.participants,
    extras: value.extras.filter((extra) => extra.amount !== 0),
  }

  const overpayment = numbers.overpaid(value)

  if (overpayment > 0)
    normalized.extras.push({ amount: overpayment })

  return normalized
}

export function autoeffects(value: Value, payers: string[], total: number): void {
  if (payers.length === 1)
    // payer MUST be in participants
    value.participants[payers[0]].paid = total
}

export function share(value: Value): Record<string, number> {
  const participants = value.participants
  const total = numbers.total(value)

  return Object.fromEntries(
    Object.keys(participants).map((id) => {
      const amount = participants[id]?.amount ?? 0

      return [id, total > 0 ? Math.max(0, Math.round((amount / total) * 10)) : 0]
    }),
  )
}

export interface Props {
  value?: Value
  onsubmit?: (value: Value) => Promise<void | Error>
}

export type { Value }
