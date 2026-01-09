import type { Expense } from './net'

export function total({ participants, extras }: Pick<Expense, 'participants' | 'extras'>) {
  return (
    Object.values(participants).reduce((acc, participant) => acc + participant.amount, 0) +
    (extras[0]?.amount ?? 0)
  )
}
