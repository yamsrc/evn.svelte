<script lang="ts">
  import { Async, ok } from 'svas'
  import { dict, locale } from '@/notifications/ui/intl'
  import { account } from '@/iam'
  import { contacts } from '@/contacts'
  import { currency } from '$lib/tools'
  import Base from '../Base.svelte'
  import type { Props } from './Transferred'

  const { notification }: Props = $props()

  const { delta, balance } = $derived(notification.payload)

  const amount = $derived(currency(Math.abs(delta), $locale))
  const remainder = $derived(currency(Math.abs(balance), $locale))
  const payer = $derived(notification.payload.delta < 0 ? notification.key : $account?.id)
  const received = $derived(payer !== $account?.id)
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact && ok(contact.account)}
      {@const { name, grammar } = contact.account}
      <Base href={`/contacts/${contact.identity}`}>
        <div>
          {#if received}
            {$dict.contacts.transferred.received(name, amount, grammar)}
          {:else}
            {$dict.contacts.transferred.paid(name, amount, grammar)}
          {/if}
          <p class="text-muted-foreground">
            {#if balance === 0}
              {$dict.contacts.transferred.balance.even}
            {:else if balance > 0}
              {$dict.contacts.transferred.balance.owed(remainder)}
            {:else}
              {$dict.contacts.transferred.balance.owe(remainder)}
            {/if}
          </p>
        </div>
      </Base>
    {/if}
  {/snippet}
</Async>
