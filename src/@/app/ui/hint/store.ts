import { value } from 'svas'

export type Hints = Record<string, number | true>

export const hints = value<Hints>({
  persist: 'hints',
  default: {},
})
