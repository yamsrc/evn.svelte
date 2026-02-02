<script lang="ts">
  import { Transfer, Expense } from './views'
  import type { Props } from './Expense'

  const { expense, highlighted }: Props = $props()
</script>

{#if expense.title === undefined}
  <Transfer {expense} {highlighted} />
{:else}
  <Expense {expense} {highlighted} />
{/if}
