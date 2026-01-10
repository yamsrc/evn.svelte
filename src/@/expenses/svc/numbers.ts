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

export function balance(value: Value): number {
  const me = get(account)

  if (me === null || value.participants[me.id] === undefined)
    return 0

  const totalSpent = total(value)
  const totalPaid = paid(value)
  const overpayment = Math.max(totalPaid - totalSpent, 0)

  // when the bill is overpaid, excess amount will be added to the extras
  // and should be split among the participants proportionally to their spending
  const bill = totalSpent + overpayment
  const myPercent = totalSpent === 0 ? 0 : (value.participants[me.id].amount ?? 0) / totalSpent
  const myBill = Math.round(bill * myPercent)
  const iPaid = value.participants[me.id].paid ?? 0

  return iPaid - myBill
}
