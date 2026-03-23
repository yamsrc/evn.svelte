import type { EdgeView, NodeView } from './Canvas'

export interface Props {
  edges: EdgeView[]
  nodeMap: Map<string, NodeView>
}

export const GAP = 5
export const ARM = 6
export const AH = ARM * Math.SQRT1_2
