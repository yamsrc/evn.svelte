export interface NodeView {
  id: string
  px: number
  py: number
}

export interface EdgeView {
  from: string
  to: string
  amount: number
  mx: number
  my: number
}

export interface Member {
  id: string
  name: string
  picture?: string
}

export interface Props {
  viewBox: string
  nodes: NodeView[]
  edges: EdgeView[]
  members: Map<string, Member>
  me?: string
  step: number
}

export const R = 16
export const STROKE_W = 1.5
