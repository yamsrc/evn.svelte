import type { Return } from './Return'
import type { Section } from './Nav'

type ReturnLike = Omit<Return, 'id'>

export interface Props {
  ret: ReturnLike
  section?: Section
}
