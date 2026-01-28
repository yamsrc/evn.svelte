<script lang="ts">
  import { Section } from '@/app/ui'
  import { filter } from '@/expenses'
  import { Expense } from '@/expenses/ui'
  import type { Props } from './Expenses'
  import type { Expense as ExpenseType } from '@/expenses'

  const { expenses, search, notifications }: Props = $props()

  const unseen = (expense: ExpenseType) =>
    notifications?.some((n) => {
      if (n.domain === 'expenses' && n.key === expense.id) return true

      if (
        expense.title === undefined &&
        n.domain === 'contacts' &&
        n.event === 'transferred' &&
        n.key in expense.participants
      )
        return true

      return false
    }) ?? false
</script>

<Section id="expenses-list" class="flex flex-col gap-1.5">
  {#each filter(expenses, search) as expense (expense.id)}
    {@const highlighted = unseen(expense)}
    <Expense {expense} {highlighted} />
  {/each}
</Section>
