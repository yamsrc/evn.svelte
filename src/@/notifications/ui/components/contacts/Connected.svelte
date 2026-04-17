<script lang="ts">
  import { Async, ok } from 'svas'
  import { dict } from '@/notifications/ui/intl'
  import { contacts } from '@/contacts'
  import { Avatar, Title } from '@/accounts/ui'
  import Base from '../Base.svelte'
  import type { Props } from './Connected'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact && ok(contact.account)}
      {@const name = $dict.contacts.connected(contact.account.name)}
      <Base href={`/contacts/${contact.identity}`}>
        <div class="flex items-center gap-2">
          <Avatar account={contact.account} size={32} />
          <Title account={{ ...contact.account, name }} />
        </div>
      </Base>
    {/if}
  {/snippet}
</Async>
