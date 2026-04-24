<script lang="ts">
  import type { Props } from './Plan'

  const { product, class: className, ...rest }: Props = $props()
</script>

<div
  class={['rounded-lg border bg-card px-4 py-3 flex flex-col gap-1', className]}
  {...rest}>
  <div class="text-sm text-muted-foreground">{product.displayName}</div>
  <div class="text-lg font-semibold">{product.displayPrice}</div>
  {#if product.trial}
    <div class="text-xs text-primary">
      {product.trial.displayPrice} · {product.trial.period}
    </div>
  {/if}
</div>
