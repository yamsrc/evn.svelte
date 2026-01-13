<script lang="ts">
  import { Expense } from '@/expenses/ui'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { contact, expenses }: Props = $props()

  const common = $derived(
    expenses.filter((expense) => Object.keys(expense.participants).includes(contact.identity)),
  )
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if common.length === 0}
    <p class="text-muted-foreground">{$dict.expenses.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each common as expense (expense.id)}
        <li>
          <Expense {expense} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
