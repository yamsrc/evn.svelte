import type { Value } from './Form'

export interface Props {
  value: Value
  total: number
  error?: boolean
  mode?: 'sums' | 'shares'
}
