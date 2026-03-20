<script lang="ts">
  import { ok } from 'svas'
  import { account } from '@/iam'
  import Canvas from './Canvas.svelte'
  import { PAD } from './Graph'
  import { FONT, NAME_Y } from './Nodes'
  import Zoom from './Zoom.svelte'
  import { layout, toUnit } from './layout'
  import type { EdgeView, Member, NodeView } from './Canvas'
  import type { Props } from './Graph'

  const { contacts, accounts, class: classes }: Props = $props()

  const me = $derived(ok($account) ? $account.id : undefined)

  const members = $derived.by(() => {
    const byId = new Map(accounts.map((a) => [a.id, a]))
    const ids = new Set(contacts.flatMap((c) => c.identities))

    return new Map<string, Member>(
      [...ids].map((id) => {
        const a = byId.get(id)

        return [id, { id, name: a?.name ?? id, picture: a?.picture }]
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

  const grid = $derived(layout(debts, [...members.keys()]))

  const scene = $derived.by(() => {
    if (grid.nodes.length === 0)
      return {
        W: PAD * 2,
        H: PAD * 2 + NAME_Y + FONT,
        step: 55,
        nodes: [] as NodeView[],
        edges: [] as EdgeView[],
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
  })

  let viewBox = $state('')
</script>

<Zoom contentW={scene.W} contentH={scene.H} pad={PAD} bind:viewBox class={classes}>
  <Canvas {viewBox} nodes={scene.nodes} edges={scene.edges} {members} {me} step={scene.step} />
</Zoom>
