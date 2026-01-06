import type { net } from '@/expenses'

export interface Value {
  title: string
  location: string
  participants: Record<string, net.Participant>
  extras: net.Extra[]
}

export interface Props {
  value?: Value
  onsubmit?: (value: Value) => Promise<void | Error>
}
