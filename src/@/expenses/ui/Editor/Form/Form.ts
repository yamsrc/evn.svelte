import { numbers, type net } from '@/expenses'

export function normalize(value: Value): net.Editable {
  const normalized: net.Editable = {
    title: value.title,
    location: value.location,
    participants: value.participants,
    extras: value.extras.filter((extra) => extra.amount !== 0),
  }

  const overpayment = numbers.overpayment(value)

  if (overpayment > 0)
    normalized.extras.push({ amount: overpayment })

  return normalized as net.Editable
}

export function autoeffects(value: Value, payers: string[], total: number): void {
  if (payers.length === 1)
    value.participants[payers[0]].paid = total
}

export interface Value {
  title: string
  location: string
  participants: Record<string, net.Participant>
  extras: net.Extra[]
}

export interface Props {
  value?: Value
  onsubmit?: (value: Value) => Promise<void | Error>
}
