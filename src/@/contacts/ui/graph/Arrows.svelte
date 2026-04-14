<script lang="ts">
  import { R, STROKE_W } from './Canvas'
  import { AH, AHW, GAP } from './Arrows'
  import type { Props } from './Arrows'

  const { edges, nodeMap }: Props = $props()

  function arrow(fromId: string, toId: string) {
    const f = nodeMap.get(fromId)!
    const t = nodeMap.get(toId)!
    const len = Math.hypot(t.px - f.px, t.py - f.py) || 1
    const dx = (t.px - f.px) / len
    const dy = (t.py - f.py) / len
    const gap = R + GAP

    return {
      sx: f.px + dx * gap,
      sy: f.py + dy * gap,
      tx: t.px - dx * (gap + AH),
      ty: t.py - dy * (gap + AH),
    }
  }
</script>

<defs>
  <marker
    id="arrow"
    markerWidth={AH}
    markerHeight={AHW * 2}
    refX={0}
    refY={AHW}
    markerUnits="userSpaceOnUse"
    orient="auto-start-reverse"
    overflow="visible">
    <path d="M0,0 L{AH},{AHW} L0,{AHW * 2} Z" stroke="none" class="fill-muted-foreground" />
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
