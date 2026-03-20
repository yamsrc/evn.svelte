/**
 * Isometric (triangular) grid layout.
 * 6 directions at 60° intervals — all edges are the same pixel length.
 *
 * Grid coords (i, j) → pixel:
 *   x = i * step + j * step / 2
 *   y = j * step * √3 / 2
 */

// 6 isometric neighbor directions
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
function valid(a: Pos, b: Pos): boolean {
  const di = a[0] - b[0]
  const dj = a[1] - b[1]
  const onAxis = dj === 0 || di === 0 || di === -dj

  return onAxis && (di !== 0 || dj !== 0) && di % 2 === 0 && dj % 2 === 0
}

type Pos = [number, number]

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
  const allNodes: GridNode[] = []
  let colOffset = 0

  for (const comp of components) {
    const nodes = solveComponent(comp, adj)
    const minCol = Math.min(...nodes.map((n) => n[1][0]))
    const minRow = Math.min(...nodes.map((n) => n[1][1]))

    for (const [id, [c, r]] of nodes)
      allNodes.push({ id, col: c - minCol + colOffset, row: r - minRow })

    const maxCol = Math.max(...nodes.map((n) => n[1][0])) - minCol

    colOffset += maxCol + 3
  }

  const posMap = new Map(allNodes.map((n) => [n.id, n]))

  const edges: GridEdge[] = debts.map((d) => {
    const f = posMap.get(d.from)!
    const t = posMap.get(d.to)!

    return {
      from: d.from,
      to: d.to,
      amount: d.amount,
      midCol: (f.col + t.col) / 2,
      midRow: (f.row + t.row) / 2,
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
  const key = (c: number, r: number) => `${c},${r}`

  function place(index: number): boolean {
    if (index >= sorted.length) return true

    const id = sorted[index]
    const neighbors = [...(adj.get(id) ?? [])].filter((n) => positions.has(n))

    const candidates =
      neighbors.length > 0
        ? ring(positions.get(neighbors[0])!, 6)
          .filter((c) => neighbors.every((n) => valid(c, positions.get(n)!)))
        : positions.size === 0
          ? ([[0, 0]] as Pos[])
          : [...positions.values()].flatMap((p) => ring(p, 4))

    const unique = [...new Map(candidates.map((c) => [key(c[0], c[1]), c])).values()]

    unique.sort((a, b) => Math.abs(a[0]) + Math.abs(a[1]) - Math.abs(b[0]) - Math.abs(b[1]))

    for (const cand of unique) {
      const k = key(cand[0], cand[1])

      if (occupied.has(k)) continue

      const mids = neighbors.map((n) => {
        const p = positions.get(n)!

        return key((cand[0] + p[0]) / 2, (cand[1] + p[1]) / 2)
      })

      if (mids.some((m) => occupied.has(m))) continue

      positions.set(id, cand)
      occupied.add(k)

      for (const m of mids) occupied.add(m)

      if (place(index + 1)) return true

      positions.delete(id)
      occupied.delete(k)

      for (const m of mids) occupied.delete(m)
    }

    return false
  }

  place(0)

  return sorted.map((id) => [id, positions.get(id) ?? [0, 0]])
}
