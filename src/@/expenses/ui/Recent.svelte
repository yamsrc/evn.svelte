<script lang="ts">
  import Expense from './Expense.svelte'
  import { dict } from './intl'
  import type { Props } from './Recent'

  const { expenses }: Props = $props()
  const LIMIT = 3
</script>

<div>
  <h2>{$dict.recent.title}</h2>
  {#if expenses.length === 0}
    <p class="text-muted-foreground">{$dict.recent.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each expenses.slice(0, LIMIT) as expense (expense.id)}
        <li>
          <Expense {expense} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
