<script lang="ts">
  import { dict } from '$lib/intl'
  import Coins from './Coins.svelte'
  import type { Props } from './Balance'

  const {
    total,
    balance,
    labeled = true,
    absolute,
    totalLabel = $dict.expenses.balance.total,
    youOwe = $dict.expenses.balance.youOwe,
    youAreOwed = $dict.expenses.balance.youAreOwed,
    sign,
    class: classes,
  }: Props = $props()

  const amount = $derived(total ?? balance ?? 0)
</script>

<div class={['flex items-center justify-end gap-x-2', classes]}>
  {#if sign !== 'neutral' && labeled}
    <p class="text-muted-foreground text-sm text-nowrap">
      {#if total !== undefined}
        {totalLabel}
      {:else if balance !== undefined && balance > 0}
        {youAreOwed}
      {:else if balance !== undefined && balance < 0}
        {youOwe}
      {/if}
    </p>
  {/if}
  <Coins {amount} {sign} {absolute} />
</div>
