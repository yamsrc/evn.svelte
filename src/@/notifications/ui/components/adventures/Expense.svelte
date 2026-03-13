<script lang="ts">
  import { Async } from 'svas'
  import { currency } from '$lib/tools'
  import { accounts } from '@/accounts'
  import { dict, locale } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Expense'

  const { notification }: Props = $props()

  const expense = $derived(notification.payload.expense)
  const amount = $derived(currency(expense.amount, $locale))
</script>

<Async store={accounts.get(expense.payer)}>
  {#snippet awaited(payer)}
    <Base href={`/adventures/${notification.key}/expenses/${expense.id}/`}>
      <div>
        {$dict.adventures.expense.title(expense.title, amount)}
        <p class="text-muted-foreground">
          {$dict.adventures.expense.body(notification.payload.title)}
        </p>
      </div>
    </Base>
  {/snippet}
</Async>
