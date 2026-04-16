<script lang="ts">
  import { Async } from 'svas'
  import { dict, locale } from '@/notifications/ui/intl'
  import { numbers } from '@/expenses'
  import { accounts } from '@/accounts'
  import { currency } from '$lib/tools'
  import Base from '../Base.svelte'
  import type { Props } from './Expense'

  const { notification }: Props = $props()

  const amount = $derived(currency(numbers.total(notification.payload), $locale))

  const payer = $derived(
    Object.keys(notification.payload.participants).find(
      (id) => notification.payload.participants[id].paid !== undefined,
    ),
  )
</script>

{#if payer}
  <Async store={accounts.get(payer)}>
    {#snippet awaited(account)}
      <Base href={`/expenses/editor/${notification.key}`}>
        <div>
          {notification.payload.title} &bull; {amount}
          <p class="text-muted-foreground">
            {$dict.expenses.expense([account.name])}
          </p>
        </div>
      </Base>
    {/snippet}
  </Async>
{/if}
