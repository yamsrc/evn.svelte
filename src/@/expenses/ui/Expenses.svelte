<script lang="ts">
  import { Section } from '@/app/ui'
  import { filter } from '@/expenses'
  import { Expense } from '@/expenses/ui'
  import type { Props } from './Expenses'

  const { expenses, search, notifications }: Props = $props()

  const unseen = (id: string) =>
    notifications?.some((n) => {
      return (
        (n.domain === 'expenses' && n.key === id) ||
        (n.domain === 'contacts' && n.event === 'transferred' && n.payload?.expense === id)
      )
    }) ?? false
</script>

<Section id="expenses-list" class="flex flex-col gap-1.5">
  {#each filter(expenses, search) as expense (expense.id)}
    {@const highlighted = unseen(expense.id)}
    <Expense {expense} {highlighted} />
  {/each}
</Section>
