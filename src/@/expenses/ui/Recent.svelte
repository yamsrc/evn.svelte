<script lang="ts">
  import { unseen } from '@/expenses'
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Recent'

  const { expenses, notifications }: Props = $props()
  const LIMIT = 3
</script>

<div class="space-y-2">
  <h2>{$dict.recent.title}</h2>
  {#if expenses.length === 0}
    <p class="text-muted-foreground">{$dict.recent.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each expenses.slice(0, LIMIT) as expense (expense.id)}
        {@const highlighted = unseen(expense, notifications ?? [])}
        <li>
          <Expense {expense} {highlighted} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
