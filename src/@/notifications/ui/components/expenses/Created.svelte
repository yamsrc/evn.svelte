<script lang="ts">
  import { Async } from 'svas'
  import { accounts } from '@/accounts'
  import Coins from '@/app/ui/Coins.svelte'
  import { numbers } from '@/expenses'
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Created'

  const { notification }: Props = $props()

  const amount = $derived(numbers.total(notification.payload))

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
          {notification.payload.title}
          <p class="text-muted-foreground">
            <Coins {amount} sign="neutral" class="gap-1 inline-flex" />
            {$dict.expenses.created(account.name, account.grammar)}
          </p>
        </div>
      </Base>
    {/snippet}
  </Async>
{/if}
