<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { cn } from '$lib/utils'
  import type { Props } from './Balance'

  const {
    total,
    balance,
    totalLabel = $dict.expenses.balance.total,
    youOwe = $dict.expenses.balance.youOwe,
    youAreOwed = $dict.expenses.balance.youAreOwed,
    class: classes,
  }: Props = $props()

  const amount = $derived(Math.abs(total ?? balance ?? 0))

  function color(amount: number) {
    if (balance && amount > 0) return 'var(--constructive)'

    if (balance && amount < 0) return 'var(--destructive)'

    return 'var(--muted-foreground)'
  }
</script>

<div class={cn('flex flex-col-reverse items-end', classes)}>
  <div class="text-muted-foreground text-sm text-nowrap">
    {#if total !== undefined}
      {totalLabel}
    {:else if balance !== undefined && balance > 0}
      {youAreOwed}
    {:else if balance !== undefined && balance < 0}
      {youOwe}
    {/if}
  </div>
  <div class="flex items-center justify-end gap-2">
    <div class="font-bold text-foreground">{currency(amount)}</div>
    <div>
      <Coins size={16} color={color(amount)} />
    </div>
  </div>
</div>
