import type { EdgeView } from './Canvas'

export interface Props {
  edges: EdgeView[]
  me?: string
  debtBox: number
}

export const RECT_H = 30
