import { R } from './Canvas'
import type { Member, NodeView } from './Canvas'

export interface Props {
  nodes: NodeView[]
  members: Map<string, Member>
  me?: string
}

export const D = R * 2
export const FONT = 16
export const NAME_Y = 16
