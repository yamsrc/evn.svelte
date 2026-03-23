<script lang="ts">
  import Arrows from './Arrows.svelte'
  import Debts from './Debts.svelte'
  import Nodes from './Nodes.svelte'
  import type { Props } from './Canvas'

  const { viewBox, nodes, edges, members, me, step }: Props = $props()

  const nodeMap = $derived(new Map(nodes.map((n) => [n.id, n])))
  const debtBox = $derived(step * 2)
</script>

<svg width="100%" height="100%" {viewBox}>
  <Arrows {edges} {nodeMap} />
  <Debts {edges} {me} {debtBox} />
  <Nodes {nodes} {members} {me} />
</svg>
