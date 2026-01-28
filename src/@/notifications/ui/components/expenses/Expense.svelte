<script lang="ts">
  import { Async } from 'svas'
  import { Button } from '$ui/button'
  import { expenses } from '@/expenses'
  import type { Props } from './Expense'

  const { notification }: Props = $props()
</script>

<Async store={expenses}>
  {#snippet awaited(expenses)}
    {@const expense = expenses.find((e) => e.id === notification.key)}
    {#if expense}
      <Button
        href={`/expenses/editor/${expense.id}`}
        class="w-full p-4 items-start h-fit font-normal"
        variant="ghost">
        <span class="text-start w-full text-pretty whitespace-normal">
          New expense: {notification.payload.title}
        </span>
      </Button>
    {/if}
  {/snippet}
</Async>
