<script lang="ts">
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { expenses, title }: Props = $props()
</script>

{#if expenses.length > 0}
  <div class="space-y-2">
    <h2>{$dict.expenses.title}</h2>
    {#each expenses as expense (expense.id)}
      <Expense {expense} {title} />
    {/each}
  </div>
{/if}
