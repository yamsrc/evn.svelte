<script lang="ts">
  import { account } from '@/iam'
  import { Leaderboard } from '@/contacts/ui'
  import { dict as common } from '$lib/intl'
  import type { Expense } from '@/expenses'

  interface Props {
    identities: string[]
    expenses: Expense[]
    class?: string
  }

  const { identities, expenses, class: classes }: Props = $props()

  const entries = $derived(
    identities.map((id) => ({
      id,
      value: expenses.reduce((sum, expense) => sum + (expense.participants[id]?.paid ?? 0), 0),
      name: id === $account?.id ? $common.expenses.me : undefined,
      href: id === $account?.id ? '/me/' : `/contacts/${id}/`,
    })),
  )

  const empty = $derived(
    entries.length === 0 || (entries.length === 1 && entries[0].id === $account?.id),
  )
</script>

<div class={['space-y-2', classes]}>
  <h2>{$common.groups.members.title}</h2>
  {#if empty}
    <p class="text-sm text-muted-foreground">{$common.groups.members.empty}</p>
  {:else}
    <Leaderboard {entries} sign="positive" neutral />
  {/if}
</div>
