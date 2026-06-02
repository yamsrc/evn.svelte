import type { Receipt } from '@/receipts'
import type { Value as ExpenseValue } from '@/expenses/ui/Editor'
import type { Statistics } from './Progress'

export interface Props {
  receipt: Receipt
  stats: Statistics
}

export function allDone(receipt: Receipt): boolean {
  return receipt.identities.every((identity) => receipt.done[identity] === true)
}

export function convert(receipt: Receipt, stats: Statistics): ExpenseValue {
  const group = receipt.links?.find((link) => link.type === 'group')?.id
  const links = [{ type: 'receipt', id: receipt.id }]

  if (group !== undefined)
    links.push({ type: 'group' as const, id: group })

  return {
    total: { amount: stats.total, touched: false },
    title: receipt.title,
    location: receipt.merchant?.location,
    participants: toParticipants(stats),
    extras: [],
    attachments: receipt.attachments,
    links,
  }
}

function toParticipants(stats: Statistics): ExpenseValue['participants'] {
  return Object.fromEntries(
    Object.entries(stats.portions).map(([identity, portion]) =>
      [identity, { amount: portion.total, touched: true }]))
}
