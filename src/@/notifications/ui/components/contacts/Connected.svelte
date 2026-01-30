<script lang="ts">
  import { Async, ok } from 'svas'
  import { Picture } from '@/accounts/ui'
  import { contacts } from '@/contacts'
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Connected'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact}
      <Base href={`/contacts/${contact.identity}`}>
        <div class="flex items-center gap-2">
          {#if ok(contact.account)}
            <Picture account={contact.account} size={32} />
          {/if}
          {$dict.contacts.connected(contact.account?.name)}
        </div>
      </Base>
    {/if}
  {/snippet}
</Async>
