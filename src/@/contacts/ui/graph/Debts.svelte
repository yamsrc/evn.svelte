<script lang="ts">
  import { Coins } from '@/app/ui'
  import { RECT_H } from './Debts'
  import { STROKE_W } from './Canvas'
  import type { Props } from './Debts'

  const { edges, me, debtBox }: Props = $props()
</script>

{#each edges as edge (`debt-${edge.from}-${edge.to}`)}
  {@const sign = edge.from === me ? 'negative' : edge.to === me ? 'positive' : 'neutral'}
  <foreignObject x={edge.mx - debtBox / 2} y={edge.my - RECT_H / 2} width={debtBox} height={RECT_H}>
    <div class="flex items-center justify-center h-full">
      <div
        class="flex items-center px-2 rounded-md bg-background"
        style="border: {STROKE_W}px solid var(--muted);">
        <Coins amount={edge.amount} {sign} class="text-base font-bold" />
      </div>
    </div>
  </foreignObject>
{/each}
