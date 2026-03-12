<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { cn } from '$lib/utils'
  import { currency } from '$lib/tools'
  import { locale } from '$lib/intl'
  import type { Props } from './Coins'

  const { id, amount, prefix, sign, class: classes }: Props = $props()

  const color = $derived.by(() => {
    if (sign === 'neutral' || (sign === undefined && amount === 0)) return 'var(--muted-foreground)'

    if (sign === 'positive' || (sign === undefined && amount !== undefined && amount > 0))
      return 'var(--constructive)'

    if (sign === 'negative' || (sign === undefined && amount !== undefined && amount < 0))
      return 'var(--destructive)'

    return 'var(--muted-foreground)'
  })
</script>

<div {id} class={cn('flex items-center gap-2', classes)}>
  {#if amount !== undefined}
    <div class="font-bold">{prefix ? `${prefix} ` : ''}{currency(Math.abs(amount), $locale)}</div>
  {/if}
  <div>
    <Coins size={16} {color} />
  </div>
</div>
