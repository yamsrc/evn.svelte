import type { Receipt } from '@/receipts'

export interface Props {
  receipt: Receipt
  actor: string
}

export function allDone(receipt: Receipt): boolean {
  return receipt.identities.every((identity) => receipt.done[identity] === true)
}
