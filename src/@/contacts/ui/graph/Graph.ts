import { toUnit } from './layout'
import { FONT, NAME_Y } from './Nodes'
import type { Contact } from '@/contacts'
import type { Account } from '@/accounts'
import type { GridLayout } from './layout'
import type { EdgeView, NodeView } from './Canvas'

export type AccountLike = Pick<Account, 'id' | 'name' | 'picture' | 'premium'>
export type ContactLike = Pick<Contact, 'identities' | 'balance'>

export interface Props {
  contacts: ContactLike[]
  accounts: AccountLike[]
  class?: string
  showNames?: boolean
}

export const PAD = 28
export const MAX_W = 600
export const MAX_H = 400
export const MAX_STEP = 80
export const SOLO_STEP = 55

export interface Scene {
  W: number
  H: number
  step: number
  nodes: NodeView[]
  edges: EdgeView[]
}

const EMPTY: Scene = {
  W: PAD * 2,
  H: PAD * 2 + NAME_Y + FONT,
  step: SOLO_STEP,
  nodes: [],
  edges: [],
}

export function buildScene(grid: GridLayout): Scene {
  if (grid.nodes.length === 0) return EMPTY

  const units = grid.nodes.map((n) => toUnit(n.col, n.row))
  const xs = units.map((u) => u[0])
  const ys = units.map((u) => u[1])
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const rangeX = Math.max(...xs) - minX
  const rangeY = Math.max(...ys) - minY

  const step = MAX_STEP

  const offX = -minX * step + PAD
  const offY = -minY * step + PAD

  const xy = (col: number, row: number) => {
    const [ux, uy] = toUnit(col, row)

    return [ux * step + offX, uy * step + offY] as const
  }

  const nodes: NodeView[] = grid.nodes.map((n) => {
    const [px, py] = xy(n.col, n.row)

    return { id: n.id, px, py }
  })

  const edges: EdgeView[] = grid.edges.map((e) => {
    const [mx, my] = xy(e.midCol, e.midRow)

    return { from: e.from, to: e.to, amount: e.amount, mx, my }
  })

  return {
    W: rangeX * step + PAD * 2,
    H: rangeY * step + PAD * 2 + NAME_Y + FONT,
    step,
    nodes,
    edges,
  }
}
