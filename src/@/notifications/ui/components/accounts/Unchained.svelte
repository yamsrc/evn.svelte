<script lang="ts">
  import { Async } from 'svas'
  import { Button } from '$ui/button'
  import { contacts } from '@/contacts'
  import type { Props } from './Unchained'

  const { notification }: Props = $props()
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === notification.key)}
    {#if contact}
      <Button
        href={`/contacts/${contact.id}`}
        class="w-full p-4 items-start h-fit font-normal"
        variant="ghost">
        <span class="text-start w-full text-pretty whitespace-normal">
          {contact.account?.name} has taken account
        </span>
      </Button>
    {/if}
  {/snippet}
</Async>
