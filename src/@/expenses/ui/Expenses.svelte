<script lang="ts">
  import { Expense } from '@/expenses/ui'
  import { unseen } from '@/expenses'
  import type { Props } from './Expenses'

  const { expenses, notifications }: Props = $props()
</script>

<div id="expenses-list" class="flex flex-col gap-1.5">
  {#each expenses as expense (expense.id)}
    {@const highlighted = unseen(expense, notifications ?? [])}
    <Expense {expense} {highlighted} />
  {/each}
</div>
