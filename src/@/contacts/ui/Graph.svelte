<script lang="ts">
  import { ok } from 'svas'
  import { Picture } from '@/accounts/ui'
  import { Coins } from '@/app/ui'
  import { account } from '@/iam'
  import { layout, toUnit } from './graph-layout'
  import type { Props } from './Graph'

  const { contacts, accounts, class: classes }: Props = $props()

  const me = $derived(ok($account) ? $account.id : undefined)

  const GAP = 5
  const R = 16
  const D = R * 2
  const ARM = 6
  const AH = ARM * Math.SQRT1_2 // arm projection — gives 90° between arms
  const RECT_H = 30
  const FONT = 16
  const STROKE_W = 1.5
  const NAME_Y = 16
  const PAD = 28

  const memberMap = $derived.by(() => {
    const byId = new Map(accounts.map((a) => [a.id, a]))
    const ids = new Set(contacts.flatMap((c) => c.identities))

    return new Map(
      [...ids].map((id) => {
        const a = byId.get(id)

        return [id, { id, name: a?.name ?? id, picture: a?.picture }] as const
      }),
    )
  })

  const debts = $derived(
    contacts
      .filter((c) => c.balance !== 0)
      .map((c) => ({
        from: c.balance > 0 ? c.identities[0] : c.identities[1],
        to: c.balance > 0 ? c.identities[1] : c.identities[0],
        amount: Math.abs(c.balance),
      })),
  )

  const grid = $derived(layout(debts, [...memberMap.keys()]))

  const nodeMap = $derived(new Map(grid.nodes.map((n) => [n.id, n])))

  const viewport = $derived.by(() => {
    if (grid.nodes.length === 0)
      return {
        W: PAD * 2,
        H: PAD * 2 + NAME_Y + FONT,
        step: 55,
        x: () => PAD,
        y: () => PAD,
      }

    const units = grid.nodes.map((n) => toUnit(n.col, n.row))
    const xs = units.map((u) => u[0])
    const ys = units.map((u) => u[1])
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const rangeX = Math.max(...xs) - minX
    const rangeY = Math.max(...ys) - minY

    const step = Math.min((600 - PAD * 2) / (rangeX || 1), (400 - PAD * 2) / (rangeY || 1), 80)
    const offX = -minX * step + PAD
    const offY = -minY * step + PAD

    return {
      W: rangeX * step + PAD * 2,
      H: rangeY * step + PAD * 2 + NAME_Y + FONT,
      step,
      x: (col: number, row: number) => toUnit(col, row)[0] * step + offX,
      y: (col: number, row: number) => toUnit(col, row)[1] * step + offY,
    }
  })

  function arrow(fromId: string, toId: string) {
    const fn = nodeMap.get(fromId)!
    const tn = nodeMap.get(toId)!
    const x1 = viewport.x(fn.col, fn.row)
    const y1 = viewport.y(fn.col, fn.row)
    const x2 = viewport.x(tn.col, tn.row)
    const y2 = viewport.y(tn.col, tn.row)
    const len = Math.hypot(x2 - x1, y2 - y1) || 1
    const dx = (x2 - x1) / len
    const dy = (y2 - y1) / len
    const gap = R + GAP

    return { sx: x1 + dx * gap, sy: y1 + dy * gap, tx: x2 - dx * gap, ty: y2 - dy * gap }
  }

  const DEBT_BOX = $derived(viewport.step * 2)
</script>

<svg width="100%" height="100%" viewBox="0 0 {viewport.W} {viewport.H}" class={classes}>
  <defs>
    <marker
      id="arrow"
      markerWidth={AH}
      markerHeight={AH * 2}
      refX={AH}
      refY={AH}
      markerUnits="userSpaceOnUse"
      orient="auto-start-reverse"
      overflow="visible">
      <path
        d="M0,0 L{AH},{AH} L0,{AH * 2}"
        fill="none"
        stroke-width={STROKE_W}
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-muted-foreground" />
    </marker>
  </defs>

  <!-- Edges -->
  {#each grid.edges as edge (`${edge.from}-${edge.to}`)}
    {@const a = arrow(edge.from, edge.to)}
    <line
      x1={a.sx}
      y1={a.sy}
      x2={a.tx}
      y2={a.ty}
      stroke-width={STROKE_W}
      stroke-linecap="round"
      marker-end="url(#arrow)"
      class="stroke-muted-foreground" />
  {/each}

  <!-- Debt labels -->
  {#each grid.edges as edge (`debt-${edge.from}-${edge.to}`)}
    {@const mx = viewport.x(edge.midCol, edge.midRow)}
    {@const my = viewport.y(edge.midCol, edge.midRow)}
    {@const sign = edge.from === me ? 'negative' : edge.to === me ? 'positive' : 'neutral'}
    <foreignObject x={mx - DEBT_BOX / 2} y={my - RECT_H / 2} width={DEBT_BOX} height={RECT_H}>
      <div class="flex items-center justify-center h-full">
        <div
          class="flex items-center px-2 rounded-md bg-background"
          style="border: {STROKE_W}px solid var(--muted-foreground);">
          <Coins amount={edge.amount} {sign} class="text-base font-bold" />
        </div>
      </div>
    </foreignObject>
  {/each}

  <!-- Nodes -->
  {#each grid.nodes as node (node.id)}
    {@const nx = viewport.x(node.col, node.row)}
    {@const ny = viewport.y(node.col, node.row)}
    {@const member = memberMap.get(node.id)}
    {@const isMe = me !== undefined && node.id === me}

    {#if isMe}
      <circle cx={nx} cy={ny} r={R + 2} fill="none" stroke-width="2" class="stroke-primary" />
    {/if}

    <foreignObject x={nx - R} y={ny - R} width={D} height={D}>
      {#if member?.picture}
        <Picture account={{ ...member, picture: member.picture }} size={D} class="w-full h-full" />
      {:else}
        <div
          class="flex items-center justify-center w-full h-full rounded-full bg-muted text-muted-foreground"
          style="font-size: {FONT * 0.7}px;">
          {member?.name[0] ?? '?'}
        </div>
      {/if}
    </foreignObject>

    <text
      x={nx}
      y={ny + R + NAME_Y}
      text-anchor="middle"
      font-size={FONT}
      font-weight="bold"
      class="fill-foreground"
      stroke="var(--background)"
      stroke-width="4"
      paint-order="stroke">
      {member?.name.split(' ')[0] ?? ''}
    </text>
  {/each}
</svg>
