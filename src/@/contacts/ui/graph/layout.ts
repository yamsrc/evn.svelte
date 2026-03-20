/**
 * Isometric (triangular) grid layout.
 * 6 directions at 60° intervals — all edges are the same pixel length.
 *
 * Grid coords (i, j) → pixel:
 *   x = i * step + j * step / 2
 *   y = j * step * √3 / 2
 */

const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
]

/** Positions along all 6 directions at even distances 2..maxDist from center. */
function ring(center: Pos, maxDist: number): Pos[] {
  const out: Pos[] = []

  for (const [dc, dr] of DIRS)
    for (let d = 2; d <= maxDist; d += 2)
      out.push([center[0] + dc * d, center[1] + dr * d])

  return out
}

/** True when a→b lies along one of 3 isometric axes at an even step distance. */
function aligned(a: Pos, b: Pos): boolean {
  const di = a[0] - b[0]
  const dj = a[1] - b[1]
  const onAxis = dj === 0 || di === 0 || di === -dj

  return onAxis && (di !== 0 || dj !== 0) && di % 2 === 0 && dj % 2 === 0
}

type Pos = [number, number]

const posKey = (c: number, r: number) => `${c},${r}`
const mid = (a: number, b: number) => (a + b) / 2

/** Deduplicate positions by grid key, sort by Manhattan distance to origin. */
function nearest(candidates: Pos[]): Pos[] {
  const unique = [
    ...new Map(candidates.map((c) => [posKey(c[0], c[1]), c])).values(),
  ]

  unique.sort(
    (a, b) => Math.abs(a[0]) + Math.abs(a[1]) - Math.abs(b[0]) - Math.abs(b[1]),
  )

  return unique
}

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

const SQ3_2 = Math.sqrt(3) / 2

/** Grid coords → unit coords (step=1) */
export function toUnit(col: number, row: number): [number, number] {
  return [col + row * 0.5, row * SQ3_2]
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

  let colOffset = 0

  for (const comp of connected) {
    const nodes = solveComponent(comp, adj)
    const cols = nodes.map((n) => n[1][0])
    const rows = nodes.map((n) => n[1][1])
    const minCol = Math.min(...cols)
    const minRow = Math.min(...rows)

    for (const [id, [c, r]] of nodes)
      place(id, c - minCol + colOffset, r - minRow)

    const maxCol = Math.max(...cols) - minCol

    colOffset += maxCol + 3
  }

  // mark edge midpoints as occupied
  const posMap = new Map(allNodes.map((n) => [n.id, n]))

  for (const d of debts) {
    const f = posMap.get(d.from)!
    const t = posMap.get(d.to)!

    occupied.add(posKey(mid(f.col, t.col), mid(f.row, t.row)))
  }

  // place orphans in nearest available grid cells
  for (const id of orphans) {
    if (allNodes.length === 0) {
      place(id, 0, 0)

      continue
    }

    const candidates = nearest(
      allNodes.flatMap((n) => ring([n.col, n.row], 6)),
    )

    for (const [c, r] of candidates)
      if (!occupied.has(posKey(c, r))) {
        place(id, c, r)

        break
      }
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

  function candidatesFor(neighbors: string[]): Pos[] {
    if (neighbors.length > 0)
      return ring(positions.get(neighbors[0])!, 6).filter((c) =>
        neighbors.every((n) => aligned(c, positions.get(n)!)),
      )

    if (positions.size === 0) return [[0, 0]]

    return [...positions.values()].flatMap((p) => ring(p, 4))
  }

  function solve(index: number): boolean {
    if (index >= sorted.length) return true

    const id = sorted[index]
    const neighbors = [...(adj.get(id) ?? [])].filter((n) => positions.has(n))

    for (const cand of nearest(candidatesFor(neighbors))) {
      const k = posKey(cand[0], cand[1])

      if (occupied.has(k)) continue

      const mids = neighbors.map((n) => {
        const p = positions.get(n)!

        return posKey(mid(cand[0], p[0]), mid(cand[1], p[1]))
      })

      if (mids.some((m) => occupied.has(m))) continue

      positions.set(id, cand)
      occupied.add(k)

      for (const m of mids) occupied.add(m)

      if (solve(index + 1)) return true

      positions.delete(id)
      occupied.delete(k)

      for (const m of mids) occupied.delete(m)
    }

    return false
  }

  solve(0)

  return sorted.map((id) => [id, positions.get(id) ?? [0, 0]])
}
