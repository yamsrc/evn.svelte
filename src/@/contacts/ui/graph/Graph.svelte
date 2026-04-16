<script lang="ts">
  import { ok } from 'svas'
  import { account } from '@/iam'
  import { layout } from './layout'
  import Zoom from './Zoom.svelte'
  import { PAD, buildScene } from './Graph'
  import Canvas from './Canvas.svelte'
  import type { Props } from './Graph'
  import type { Member } from './Canvas'

  const { contacts, accounts, class: classes, showNames = false }: Props = $props()

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
  const scene = $derived(buildScene(grid))

  let viewBox = $state('')
</script>

<Zoom contentW={scene.W} contentH={scene.H} pad={PAD} bind:viewBox class={classes}>
  <Canvas
    {viewBox}
    nodes={scene.nodes}
    edges={scene.edges}
    {members}
    {me}
    step={scene.step}
    {showNames} />
</Zoom>
