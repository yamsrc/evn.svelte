<script lang="ts">
  import { Async, ok } from 'svas'
  import { contacts } from '@/contacts'
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Unchained'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact && ok(contact?.account)}
      <Base href={`/contacts/${contact.identity}`}>
        {$dict.contacts.unchained(contact.account.name, contact.account.grammar)}
      </Base>
    {/if}
  {/snippet}
</Async>
