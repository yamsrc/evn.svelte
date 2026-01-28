<script lang="ts">
  import { ok } from 'svas'
  import { Async } from 'svas'
  import { locale } from '$lib/intl'
  import { currency } from '$lib/tools'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { contacts } from '@/contacts'
  import type { Props } from './Transferred'

  const { notification }: Props = $props()

  const delta = $derived(currency(notification.payload.delta, $locale))
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {#if ok(contacts)}
      {@const contact = contacts.find((c) => c.identity === notification.key)}
      {#if contact}
        <Async store={accounts.get(contact.identity)}>
          {#snippet awaited(account)}
            {#if ok(account)}
              <Button
                href={`/contacts/${contact.id}`}
                class="w-full p-4 items-start h-fit font-normal"
                variant="ghost">
                <span class="text-start w-full text-pretty whitespace-normal">
                  {account.name} transferred {delta}
                </span>
              </Button>
            {/if}
          {/snippet}
        </Async>
      {/if}
    {/if}
  {/snippet}
</Async>
