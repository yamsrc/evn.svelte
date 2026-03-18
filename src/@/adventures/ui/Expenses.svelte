<script lang="ts">
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { adventure }: Props = $props()

  const expenses = $derived(adventure.expenses)
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if expenses.length > 0}
    {#each expenses as expense (expense.id)}
      <Expense {adventure} {expense} />
    {/each}
  {:else}
    <p class="text-sm text-muted-foreground">{$dict.expenses.empty}</p>
  {/if}
</div>
