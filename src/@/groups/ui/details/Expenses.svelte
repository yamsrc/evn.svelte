<script lang="ts">
  import { Expense } from '@/expenses/ui'
  import { dict } from '../intl'
  import type { Expense as Entry } from '@/expenses'

  interface Props {
    expenses: Entry[]
  }

  const { expenses }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if expenses.length === 0}
    <p class="text-muted-foreground">{$dict.expenses.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each expenses as expense (expense.id)}
        <li>
          <Expense {expense} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
