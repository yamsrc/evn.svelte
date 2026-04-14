import type { Receipt, Extra } from '@/receipts'

export interface Props {
  receipt: Receipt
  extra: Extra
  portion?: number
}
