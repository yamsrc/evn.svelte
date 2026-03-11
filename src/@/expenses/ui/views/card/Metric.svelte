<script lang="ts">
  import { Coins } from '@/app/ui'
  import type { Props } from './Metric'

  const { amount, label, children, class: classes }: Props = $props()
</script>

<div class={['flex flex-col items-end text-end shrink-0', classes]}>
  <div class="flex items-center gap-2">
    <Coins {amount} sign="neutral" />
    {@render children?.()}
  </div>
  <p class="text-sm text-muted-foreground">{label}</p>
</div>
