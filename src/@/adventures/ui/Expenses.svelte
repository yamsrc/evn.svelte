<script lang="ts">
  import { Trash2 } from '@lucide/svelte'
  import { Button } from '$ui/button'
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { adventure, expenses, title }: Props = $props()
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if expenses.length > 0}
    {#each expenses as expense (expense.id)}
      <Expense {adventure} {expense} {title} />
    {/each}
  {:else}
    <p class="text-sm text-muted-foreground">{$dict.finish.delete.description}</p>
    <Button
      id="adventures-view-delete-button"
      variant="secondary"
      size="lg"
      class="w-full"
      href={`/adventures/${adventure}/archive/`}>
      <Trash2 />
      {$dict.finish.delete.button(title)}
    </Button>
  {/if}
</div>
