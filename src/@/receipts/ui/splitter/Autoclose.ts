import type { Receipt } from '@/receipts'

export interface Props {
  receipt: Receipt
  actor: string
  payer?: string
}
