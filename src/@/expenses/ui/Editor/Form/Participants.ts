import type { Value } from './Form'

export interface Props {
  value: Value
  error?: boolean
  mode?: 'sums' | 'shares'
}
