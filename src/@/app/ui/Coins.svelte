<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
  import type { Props } from './Coins'

  const { amount, sign, class: classes }: Props = $props()

  const color = $derived.by(() => {
    if (sign === 'positive' || (sign === undefined && amount !== undefined && amount > 0))
      return 'var(--constructive)'

    if (sign === 'negative' || (sign === undefined && amount !== undefined && amount < 0))
      return 'var(--destructive)'

    return 'var(--muted-foreground)'
  })
</script>

<div class={cn('flex items-center gap-2', classes)}>
  {#if amount !== undefined}
    <div class="font-bold">{currency(Math.abs(amount), $locale)}</div>
  {/if}
  <div>
    <Coins size={16} {color} />
  </div>
</div>
