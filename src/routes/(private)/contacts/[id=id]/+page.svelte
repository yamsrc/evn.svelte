<script lang="ts">
  import { Async, combined, ok } from 'svas'
  import { page } from '$app/state'
  import { Back } from '$com/history'
  import { Separator } from '$com/separator'
  import { dict } from '$lib/intl'
  import { Spinner } from '$ui/spinner'
  import { Cosmetics } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Balance, Share, Groups } from '@/contacts/ui'
  import { groups } from '@/groups'

  const id = $derived(page.params.id) as string
</script>

<Section>
  <Header.Root>
    <Back href="/contacts/">{$dict.contacts.title}</Back>
  </Header.Root>
</Section>

<Async store={combined(contacts, groups)}>
  {#snippet awaited([contacts, groups])}
    {@const contact = contacts.find((contact) => contact.id === id)}
    {#if contact?.account && ok(contact.account)}
      <Section>
        <div class="flex flex-col gap-4">
          <Cosmetics account={contact.account} editable={contact.managed} managed />
          {#if contact.managed}
            <Share {contact} />
          {/if}
        </div>
      </Section>

      <Separator />

      <Section>
        <Balance {contact} class="justify-center" />
      </Section>
      <Section class="space-y-4">
        <Groups {contact} {groups} />
      </Section>
    {:else}
      <Spinner class="m-auto" />
    {/if}
  {/snippet}
</Async>
