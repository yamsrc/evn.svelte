<script lang="ts">
  import { Async } from 'svas'
  import { expenses } from '@/expenses'
  import Base from '../Base.svelte'
  import type { Props } from './Expense'

  const { notification }: Props = $props()
</script>

<Async store={expenses}>
  {#snippet awaited(expenses)}
    {@const expense = expenses.find((e) => e.id === notification.key)}
    {#if expense}
      <Base href={`/expenses/editor/${expense.id}`}>
        Spending {notification.payload.title} updated
      </Base>
    {/if}
  {/snippet}
</Async>
