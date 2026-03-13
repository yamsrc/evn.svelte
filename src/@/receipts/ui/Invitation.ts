import type { Invitation } from '@/receipts/svc/net'

export interface Props {
  receiptId: string
  invitation?: Invitation | null
  onaccept?: () => void
}
