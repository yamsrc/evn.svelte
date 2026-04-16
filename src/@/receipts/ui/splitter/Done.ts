import type { Receipt } from '@/receipts'
import type { ButtonProps } from '$ui/button'

export interface Props extends Omit<ButtonProps, 'onclick'> {
  receipt: Receipt
  actor: string
  ondone?: () => void
}
