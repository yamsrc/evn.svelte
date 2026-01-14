import { numbers } from '@/expenses/svc'
import type { Value } from '../Context'

export interface Props {
  value: Value
}

export function split(value: Value): Record<string, number> {
  const participants = value.participants
  const total = numbers.total(value)

  return Object.fromEntries(
    Object.keys(participants).map((id) => {
      const amount = participants[id]?.amount ?? 0

      return [id, total > 0 ? Math.max(0, Math.round((amount / total) * 10)) : 0]
    }),
  )
}
