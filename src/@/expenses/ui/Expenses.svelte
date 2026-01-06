<script lang="ts">
  import { Section } from '@/app/ui'
  import { filter } from '@/expenses'
  import { Expense } from '@/expenses/ui'
  import type { Props } from './Expenses'

  const { expenses, search }: Props = $props()
</script>

<Section class="flex flex-col gap-1.5">
  {#each filter(expenses, search) as expense (expense.id)}
    <Expense {expense} />
  {/each}
</Section>
