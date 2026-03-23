/**
 * Isometric (triangular) grid layout.
 * 6 directions at 60° intervals — all edges are the same pixel length.
 */

type Pos = [number, number]

const SQRT3_HALF = Math.sqrt(3) / 2
const NODE_STEP = 2
const CONNECTED_RADIUS = 6
const ISOLATED_RADIUS = 4
const COMPONENT_GAP = 3
const MIN_ROW_WIDTH = 12
const MAX_FALLBACK_RADIUS = 50

const DIRS: Pos[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
]

const posKey = (c: number, r: number) => `${c},${r}`
const mid = (a: number, b: number) => (a + b) / 2
const midKey = (a: Pos, b: Pos) => posKey(mid(a[0], b[0]), mid(a[1], b[1]))
const manhattan = (a: Pos, b: Pos) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

export interface GridNode {
  id: string
  col: number
  row: number
}

export interface GridEdge {
  from: string
  to: string
  amount: number
  midCol: number
  midRow: number
}

export interface GridLayout {
  nodes: GridNode[]
  edges: GridEdge[]
}

interface Debt {
  from: string
  to: string
  amount: number
}

/** Grid coords → unit coords (step=1). Rotated so edges are vertical + diagonal, diagonals dominant. */
export function toUnit(col: number, row: number): Pos {
  return [col * SQRT3_HALF, row + col * 0.5]
}

/** Positions along all 6 directions at even step distances from center. */
function ring(center: Pos, radius: number): Pos[] {
  const out: Pos[] = []

  for (const [dc, dr] of DIRS)
    for (let d = NODE_STEP; d <= radius; d += NODE_STEP)
      out.push([center[0] + dc * d, center[1] + dr * d])

  return out
}

/** True when a→b lies along one of 3 isometric axes at an even step distance. */
function aligned(a: Pos, b: Pos): boolean {
  const dc = a[0] - b[0]
  const dr = a[1] - b[1]

  return (dr === 0 || dc === 0 || dc === -dr) &&
    (dc !== 0 || dr !== 0) &&
    dc % NODE_STEP === 0 &&
    dr % NODE_STEP === 0
}

/** Deduplicate positions, sort by Manhattan distance to ref. */
function nearest(candidates: Pos[], ref: Pos = [0, 0]): Pos[] {
  const unique = [
    ...new Map(candidates.map((p) => [posKey(p[0], p[1]), p])).values(),
  ]

  unique.sort((a, b) => manhattan(a, ref) - manhattan(b, ref))

  return unique
}

/** Find nearest free slot in expanding rings around centers. */
function freeSlot(
  centers: Pos[],
  occupied: Set<string>,
  ref: Pos = [0, 0],
  startRadius = CONNECTED_RADIUS,
): Pos | undefined {
  for (let r = startRadius; r <= MAX_FALLBACK_RADIUS; r += NODE_STEP) {
    const slot = nearest(
      centers.flatMap((c) => ring(c, r)),
      ref,
    ).find(([c, row]) => !occupied.has(posKey(c, row)))

    if (slot !== undefined) return slot
  }

  return undefined
}

function centroid(nodes: GridNode[]): Pos {
  const n = nodes.length

  return [
    Math.round(nodes.reduce((s, v) => s + v.col, 0) / n),
    Math.round(nodes.reduce((s, v) => s + v.row, 0) / n),
  ]
}

/** Normalize solved positions to origin, compute bounding box. */
function normalize(nodes: [string, Pos][]): {
  nodes: [string, Pos][]
  w: number
  h: number
} {
  const cols = nodes.map((n) => n[1][0])
  const rows = nodes.map((n) => n[1][1])
  const minC = Math.min(...cols)
  const minR = Math.min(...rows)

  return {
    nodes: nodes.map(([id, [c, r]]) => [id, [c - minC, r - minR]]),
    w: Math.max(...cols) - minC,
    h: Math.max(...rows) - minR,
  }
}

export function layout(
  debts: Debt[],
  memberIds: readonly string[],
): GridLayout {
  const adj = new Map<string, Set<string>>()

  for (const id of memberIds) adj.set(id, new Set())

  for (const d of debts) {
    adj.get(d.from)!.add(d.to)
    adj.get(d.to)!.add(d.from)
  }

  const components = findComponents(memberIds, adj)
  const connected = components.filter((c) => c.length > 1)
  const orphans = components.filter((c) => c.length === 1).map((c) => c[0])

  const allNodes: GridNode[] = []
  const occupied = new Set<string>()

  const place = (id: string, col: number, row: number) => {
    allNodes.push({ id, col, row })
    occupied.add(posKey(col, row))
  }

  const solved = connected.map((comp) => normalize(solveComponent(comp, adj)))

  // arrange components in rows
  const rowWidth = Math.max(
    MIN_ROW_WIDTH,
    Math.ceil(Math.sqrt(memberIds.length)) * COMPONENT_GAP,
  )

  let colOff = 0
  let rowOff = 0
  let rowH = 0

  for (const comp of solved) {
    if (colOff > 0 && colOff + comp.w > rowWidth) {
      colOff = 0
      rowOff += rowH + COMPONENT_GAP
      rowH = 0
    }

    for (const [id, [c, r]] of comp.nodes)
      place(id, c + colOff, r + rowOff)

    rowH = Math.max(rowH, comp.h)
    colOff += comp.w + COMPONENT_GAP
  }

  const posMap = new Map(allNodes.map((n) => [n.id, n]))

  // mark edge midpoints as occupied
  for (const d of debts) {
    const f = posMap.get(d.from)!
    const t = posMap.get(d.to)!

    occupied.add(midKey([f.col, f.row], [t.col, t.row]))
  }

  // place orphans near center of mass
  for (const id of orphans) {
    if (allNodes.length === 0) {
      place(id, 0, 0)

      continue
    }

    const centers: Pos[] = allNodes.map((n) => [n.col, n.row])
    const slot = freeSlot(centers, occupied, centroid(allNodes))

    if (slot !== undefined) place(id, slot[0], slot[1])
  }

  const edges: GridEdge[] = debts.map((d) => {
    const f = posMap.get(d.from)!
    const t = posMap.get(d.to)!

    return {
      from: d.from,
      to: d.to,
      amount: d.amount,
      midCol: mid(f.col, t.col),
      midRow: mid(f.row, t.row),
    }
  })

  return { nodes: allNodes, edges }
}

function findComponents(
  ids: readonly string[],
  adj: Map<string, Set<string>>,
): string[][] {
  const visited = new Set<string>()
  const result: string[][] = []

  for (const id of ids) {
    if (visited.has(id)) continue

    const comp: string[] = []
    const stack = [id]

    while (stack.length > 0) {
      const n = stack.pop()!

      if (visited.has(n)) continue

      visited.add(n)
      comp.push(n)

      for (const nb of adj.get(n) ?? []) if (!visited.has(nb)) stack.push(nb)
    }

    result.push(comp)
  }

  return result
}

function solveComponent(
  ids: string[],
  adj: Map<string, Set<string>>,
): [string, Pos][] {
  const sorted = [...ids].sort(
    (a, b) => (adj.get(b)?.size ?? 0) - (adj.get(a)?.size ?? 0),
  )

  const positions = new Map<string, Pos>()
  const occupied = new Set<string>()

  const placedNeighbors = (id: string) =>
    [...(adj.get(id) ?? [])].filter((n) => positions.has(n))

  const candidates = (neighbors: string[]): Pos[] => {
    if (neighbors.length > 0)
      return ring(positions.get(neighbors[0])!, CONNECTED_RADIUS).filter((c) =>
        neighbors.every((n) => aligned(c, positions.get(n)!)),
      )

    if (positions.size === 0) return [[0, 0]]

    return [...positions.values()].flatMap((p) => ring(p, ISOLATED_RADIUS))
  }

  const place = (id: string, cand: Pos, neighbors: string[]): boolean => {
    const k = posKey(cand[0], cand[1])

    if (occupied.has(k)) return false

    const mids = neighbors.map((n) => midKey(cand, positions.get(n)!))

    if (mids.some((m) => occupied.has(m))) return false

    positions.set(id, cand)
    occupied.add(k)
    for (const m of mids) occupied.add(m)

    return true
  }

  for (const id of sorted) {
    const neighbors = placedNeighbors(id)

    for (const cand of nearest(candidates(neighbors)))
      if (place(id, cand, neighbors)) break
  }

  // fallback: place unresolved nodes at expanding distance from origin
  for (const id of sorted) {
    if (positions.has(id)) continue

    const slot = freeSlot([[0, 0]], occupied, [0, 0], NODE_STEP)

    if (slot !== undefined) {
      positions.set(id, slot)
      occupied.add(posKey(slot[0], slot[1]))
    }
  }

  return sorted.map((id) => [id, positions.get(id)!])
}
