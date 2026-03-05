<script lang="ts">
  import { forceSimulation, forceLink, forceManyBody, forceCenter } from 'd3-force'
  import { ok } from 'svas'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { url } from '@/media/ui/Picture'
  import type { Props } from './Graph'

  const { group, account, contacts, class: classes }: Props = $props()

  type Node = { id: string; name: string; picture?: string; x: number; y: number }
  type Edge = { src: Node; tgt: Node; amount: number; curve: number }

  const W = 600
  const H = 400
  const R = 22
  const PAD = R + 20

  const identities = $derived(contacts.filter((c) => group.identities.includes(c.identity)))
  const me = $derived({ id: account.id, name: account.name, picture: account.picture })

  const others = $derived(
    identities.map((c) => {
      const a = ok(c.account) ? c.account : undefined

      return {
        id: c.identity,
        name: a?.name ?? c.identity,
        picture: a?.picture,
      }
    }),
  )

  const members = $derived([me, ...others])

  const debts = $derived(
    identities.map((c) => ({
      from: c.balance > 0 ? c.identity : account.id,
      to: c.balance > 0 ? account.id : c.identity,
      amount: Math.abs(c.balance),
    })),
  )

  const graph = $derived.by(() => {
    const nodes: Node[] = members.map((m) => ({
      id: m.id,
      name: m.name,
      picture: m.picture,
      x: 0,
      y: 0,
    }))

    // d3 links — source/target as string IDs, mutated to node refs after tick
    const links = debts.map((d) => ({
      source: d.from,
      target: d.to,
      amount: d.amount,
    }))

    forceSimulation(nodes as any)
      .force(
        'link',
        forceLink(links as any)
          .id((d: any) => d.id)
          .distance(150),
      )
      .force('charge', forceManyBody().strength(-400))
      .force('center', forceCenter(W / 2, H / 2))
      .stop()
      .tick(300)

    fitBounds(nodes)

    // Resolve d3-mutated refs → typed Edge objects
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const resolve = (ref: any): Node => byId.get(ref.id ?? ref)!

    const edges: Edge[] = links.map((l) => ({
      src: resolve(l.source),
      tgt: resolve(l.target),
      amount: l.amount,
      curve: 0,
    }))

    // Curve edges passing near non-endpoint nodes
    const margin = R + 14

    for (const e of edges)
      for (const n of nodes) {
        if (n === e.src || n === e.tgt) continue

        const d = distToSeg(n, e.src, e.tgt)

        if (d < margin) e.curve = Math.max(e.curve, 30, margin - d + 20)
      }

    return { nodes, edges: edges.filter((e) => e.amount > 0) }
  })

  /** Scale node positions to fill viewBox */
  function fitBounds(nodes: Node[]) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    for (const n of nodes) {
      minX = Math.min(minX, n.x)
      maxX = Math.max(maxX, n.x)
      minY = Math.min(minY, n.y)
      maxY = Math.max(maxY, n.y)
    }

    const rangeX = maxX - minX || 1
    const rangeY = maxY - minY || 1
    const scale = Math.min((W - PAD * 2) / rangeX, (H - PAD * 2) / rangeY)

    for (const n of nodes) {
      n.x = PAD + (n.x - minX) * scale + (W - PAD * 2 - rangeX * scale) / 2
      n.y = PAD + (n.y - minY) * scale + (H - PAD * 2 - rangeY * scale) / 2
    }
  }

  /** Distance from point to line segment */
  function distToSeg(p: Node, a: Node, b: Node): number {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const lenSq = dx * dx + dy * dy

    if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y)

    const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq))

    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy))
  }

  /** Clipped endpoints and control point for edge between two nodes */
  function geom(src: Node, tgt: Node, curve: number) {
    const dx = tgt.x - src.x
    const dy = tgt.y - src.y
    const len = Math.hypot(dx, dy) || 1
    const ux = dx / len
    const uy = dy / len
    const sx = src.x + ux * R
    const sy = src.y + uy * R
    const tx = tgt.x - ux * R
    const ty = tgt.y - uy * R
    const cx = (sx + tx) / 2 + uy * curve
    const cy = (sy + ty) / 2 - ux * curve

    return { sx, sy, tx, ty, cx, cy }
  }

  function path(src: Node, tgt: Node, curve: number): string {
    const { sx, sy, tx, ty, cx, cy } = geom(src, tgt, curve)

    return curve === 0 ? `M${sx},${sy}L${tx},${ty}` : `M${sx},${sy}Q${cx},${cy} ${tx},${ty}`
  }

  function mid(src: Node, tgt: Node, curve: number): { x: number; y: number } {
    const { sx, sy, tx, ty, cx, cy } = geom(src, tgt, curve)

    return { x: 0.25 * sx + 0.5 * cx + 0.25 * tx, y: 0.25 * sy + 0.5 * cy + 0.25 * ty }
  }
</script>

<svg width="100%" viewBox="0 0 {W} {H}" class={['rounded-lg border border-border', classes]}>
  <defs>
    <marker
      id="arrow"
      viewBox="0 -5 10 10"
      refX="10"
      refY="0"
      markerWidth="6"
      markerHeight="6"
      orient="auto">
      <path d="M0,-5L10,0L0,5" class="fill-muted-foreground" />
    </marker>
    {#each graph.nodes as node (node.id)}
      <clipPath id="clip-{node.id}">
        <circle cx={node.x} cy={node.y} r={R} />
      </clipPath>
    {/each}
  </defs>

  {#each graph.edges as edge (`${edge.src.id}-${edge.tgt.id}`)}
    {@const m = mid(edge.src, edge.tgt, edge.curve)}
    <path
      d={path(edge.src, edge.tgt, edge.curve)}
      fill="none"
      stroke-width="1.5"
      marker-end="url(#arrow)"
      class="stroke-muted-foreground" />
    <text
      x={m.x}
      y={m.y}
      text-anchor="middle"
      dominant-baseline="central"
      class="fill-foreground stroke-background"
      paint-order="stroke"
      stroke-width="3">
      {currency(edge.amount, $locale)}
    </text>
  {/each}

  {#each graph.nodes as node (node.id)}
    {#if node.picture}
      <image
        href={url({ id: node.picture, path: '/pictures/', variant: '300x300!' })}
        x={node.x - R}
        y={node.y - R}
        width={R * 2}
        height={R * 2}
        clip-path="url(#clip-{node.id})" />
    {:else}
      <circle cx={node.x} cy={node.y} r={R} class="fill-muted stroke-border" />
      <text x={node.x} y={node.y + 5} text-anchor="middle" class="fill-muted-foreground">
        {node.name[0]}
      </text>
    {/if}
    <text
      x={node.x}
      y={node.y + R + 14}
      text-anchor="middle"
      class="fill-foreground stroke-background"
      paint-order="stroke"
      stroke-width="3">
      {node.name.split(' ')[0]}
    </text>
  {/each}
</svg>
