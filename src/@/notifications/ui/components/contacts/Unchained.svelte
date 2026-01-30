<script lang="ts">
  import { Async } from 'svas'
  import { contacts } from '@/contacts'
  import Base from '../Base.svelte'
  import type { Props } from './Unchained'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact}
      <Base href={`/contacts/${contact.id}`}>
        {contact.account?.name} has taken account
      </Base>
    {/if}
  {/snippet}
</Async>
