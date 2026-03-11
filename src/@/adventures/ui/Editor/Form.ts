import type { Value } from './Context'

export interface Props {
  id?: string
  value?: Value
  busy?: boolean
  onsubmit?: (value: Value) => Promise<void | Error>
}

export type { Value }
