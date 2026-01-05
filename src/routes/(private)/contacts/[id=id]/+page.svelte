<script lang="ts">
  import { Async, ok } from 'svas'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { dict } from '$lib/intl'
  import { Spinner } from '$ui/spinner'
  import { Cosmetics } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Share } from '@/contacts/ui'

  const id = $derived(page.params.id) as string
</script>

<Section>
  <Header.Root>
    <Back href="/contacts/">{$dict.contacts.title}</Back>
  </Header.Root>
</Section>

<Section>
  <Async store={contacts}>
    {#snippet awaited(contacts)}
      {@const contact = contacts.find((contact) => contact.id === id)}
      {#if contact?.account && ok(contact.account)}
        <div class="flex flex-col gap-4">
          <Cosmetics account={contact.account} editable={contact.managed} managed />
          {#if contact.managed}
            <Share {contact} />
          {/if}
        </div>
      {:else}
        <Spinner class="m-auto" />
      {/if}
    {/snippet}
  </Async>
</Section>
