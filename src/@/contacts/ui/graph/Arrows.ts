import type { EdgeView, NodeView } from './Canvas'

export interface Props {
  edges: EdgeView[]
  nodeMap: Map<string, NodeView>
}

export const GAP = 5
export const AH = 8
export const AHW = 4
