<script lang="ts">
  import { AH, GAP } from './Arrows'
  import { R, STROKE_W } from './Canvas'
  import type { Props } from './Arrows'

  const { edges, nodeMap }: Props = $props()

  function arrow(fromId: string, toId: string) {
    const f = nodeMap.get(fromId)!
    const t = nodeMap.get(toId)!
    const len = Math.hypot(t.px - f.px, t.py - f.py) || 1
    const dx = (t.px - f.px) / len
    const dy = (t.py - f.py) / len
    const gap = R + GAP

    return { sx: f.px + dx * gap, sy: f.py + dy * gap, tx: t.px - dx * gap, ty: t.py - dy * gap }
  }
</script>

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

{#each edges as edge (`${edge.from}-${edge.to}`)}
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
