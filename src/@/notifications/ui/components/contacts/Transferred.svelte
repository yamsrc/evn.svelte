<script lang="ts">
  import { Async } from 'svas'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { contacts } from '@/contacts'
  import { account } from '@/iam'
  import Base from '../Base.svelte'
  import type { Props } from './Transferred'

  const { notification }: Props = $props()

  const delta = $derived(currency(Math.abs(notification.payload.delta), $locale))
  const balance = $derived(currency(notification.payload.balance, $locale))
  const payer = $derived(notification.payload.delta < 0 ? notification.key : $account?.id)
  const received = $derived(payer !== $account?.id)
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact}
      <Base href={`/contacts/${contact.identity}`}>
        {#if received}
          You've received {delta} from {contact.account?.name}. Balance: {balance}
        {:else}
          You've paid {delta} to {contact.account?.name}. Balance: {balance}
        {/if}
      </Base>
    {/if}
  {/snippet}
</Async>
