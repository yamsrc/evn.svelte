<script lang="ts">
  import { Transfer, Expense } from './views'
  import type { Props } from './Expense'

  const { expense }: Props = $props()
</script>

{#if expense.title === undefined}
  <Transfer {expense} />
{:else}
  <Expense {expense} />
{/if}
