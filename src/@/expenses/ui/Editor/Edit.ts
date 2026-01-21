import type { Value } from './Context'

export interface Props {
  id?: string
  mode?: 'sums' | 'shares'
  value: Value
}
