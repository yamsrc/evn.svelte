<script lang="ts">
  import { Receipt } from '@/receipts/ui'
  import { unseen } from '@/expenses'
  import { dict } from './intl'
  import Expense from './Expense.svelte'
  import type { Props } from './Recent'

  const { expenses, receipts, notifications }: Props = $props()
  const EXPENSES = 3
  const RECEIPTS = 2
</script>

<div class="space-y-2">
  <h2>{$dict.recent.title}</h2>
  {#if expenses.length === 0}
    <p class="text-muted-foreground">{$dict.recent.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each receipts.slice(0, RECEIPTS) as receipt (receipt.id)}
        <li>
          <Receipt {receipt} />
        </li>
      {/each}
      {#each expenses.slice(0, EXPENSES) as expense (expense.id)}
        {@const highlighted = unseen(expense, notifications ?? [])}
        <li>
          <Expense {expense} {highlighted} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
