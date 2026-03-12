<script lang="ts">
  import { cn } from '$lib/utils'
  import { dict } from '$lib/intl'
  import Coins from './Coins.svelte'
  import type { Props } from './Balance'

  const {
    total,
    balance,
    totalLabel = $dict.expenses.balance.total,
    youOwe = $dict.expenses.balance.youOwe,
    youAreOwed = $dict.expenses.balance.youAreOwed,
    class: classes,
  }: Props = $props()

  const amount = $derived(total ?? balance ?? 0)
</script>

<div class={cn('flex items-center justify-end gap-2', classes)}>
  <p class="text-muted-foreground text-sm text-nowrap">
    {#if total !== undefined}
      {totalLabel}
    {:else if balance !== undefined && balance > 0}
      {youAreOwed}
    {:else if balance !== undefined && balance < 0}
      {youOwe}
    {/if}
  </p>
  <Coins {amount} />
</div>
