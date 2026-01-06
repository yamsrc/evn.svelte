<script lang="ts">
  import { Coins } from '@lucide/svelte'
  import { dict } from '$lib/intl'
  import { currency } from '$lib/tools'
  import type { Props } from './Balance'

  const { total, balance }: Props = $props()

  const amount = $derived(Math.abs(total ?? balance ?? 0))

  function color(amount: number) {
    if (balance && amount > 0) return 'var(--constructive)'

    if (balance && amount < 0) return 'var(--destructive)'

    return 'var(--muted-foreground)'
  }
</script>

<div class="flex flex-col-reverse items-end">
  <div class="text-muted-foreground text-sm text-nowrap">
    {#if total !== undefined}
      {$dict.expenses.balance.total}
    {:else if balance !== undefined && balance > 0}
      {$dict.expenses.balance.youAreOwed}
    {:else if balance !== undefined && balance < 0}
      {$dict.expenses.balance.youOwe}
    {/if}
  </div>
  <div class="flex items-center justify-end gap-2">
    <div class="font-bold text-foreground">{currency(amount)}</div>
    <div>
      <Coins size={16} color={color(amount)} />
    </div>
  </div>
</div>
