<script lang="ts">
  import { Expense } from '@/expenses/ui'
  import { filter, unseen } from '@/expenses'
  import type { Props } from './Expenses'

  const { expenses, search, notifications }: Props = $props()
</script>

<div id="expenses-list" class="flex flex-col gap-1.5">
  {#each filter(expenses, search) as expense (expense.id)}
    {@const highlighted = unseen(expense, notifications ?? [])}
    <Expense {expense} {highlighted} />
  {/each}
</div>
