import type { Extra, Participant } from '@/expenses'

export interface Props {
  participants: Record<string, Participant>
  extras: Extra[]
}
