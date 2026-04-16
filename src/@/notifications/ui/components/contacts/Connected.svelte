<script lang="ts">
  import { Async, ok } from 'svas'
  import { dict } from '@/notifications/ui/intl'
  import { contacts } from '@/contacts'
  import { Picture } from '@/accounts/ui'
  import Base from '../Base.svelte'
  import type { Props } from './Connected'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact && ok(contact.account)}
      <Base href={`/contacts/${contact.identity}`}>
        <div class="flex items-center gap-2">
          <Picture account={contact.account} size={32} />
          {$dict.contacts.connected(contact.account.name)}
        </div>
      </Base>
    {/if}
  {/snippet}
</Async>
