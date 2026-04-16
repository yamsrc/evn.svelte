import type { ClassValue } from 'svelte/elements'
import type { Receipt } from '@/receipts'

export interface Props {
  receipt: Receipt
  class?: ClassValue
  onclick?: () => void
}
