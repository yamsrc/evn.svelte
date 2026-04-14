<script lang="ts">
  import { account } from '@/iam'
  import { Expense } from '@/expenses/ui'
  import { dict } from './intl'
  import type { Props } from './Expenses'

  const { identities, expenses }: Props = $props()

  const others = $derived(identities.filter((id) => id !== $account?.id))

  const common = $derived.by(() => {
    if (!$account) return []

    return expenses.filter((expense) => {
      const participants = Object.keys(expense.participants)

      return participants.includes($account.id) && participants.some((id) => others.includes(id))
    })
  })
</script>

<div class="space-y-2">
  <h2>{$dict.expenses.title}</h2>
  {#if common.length === 0}
    <p class="text-muted-foreground">{$dict.expenses.empty}</p>
  {:else}
    <ul class="space-y-2">
      {#each common as expense (expense.id)}
        <li>
          <Expense {expense} />
        </li>
      {/each}
    </ul>
  {/if}
</div>
