import { numbers } from '@/expenses'
import type { Value } from './Form'

export interface Props {
  value: Value
}

/**
 * Redistributes the amount among the untouched participants
 */
export function redistribute(value: Value): void {
  const ids = Object.keys(value.participants)
  const total = value.total.amount

  let touched = 0

  for (const id of ids)
    if (value.participants[id].touched === true) touched += value.participants[id].amount

  if (touched >= total && total > 0) return

  const untouched = ids.filter((id) => value.participants[id].touched !== true)

  if (untouched.length > 0) {
    const parts = numbers.split(total - touched, untouched)

    for (const [id, part] of Object.entries(parts)) value.participants[id].amount = part
  }
}
