<script lang="ts">
  import { Async, combined, ok } from 'svas'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Separator } from '$com/separator'
  import { Actions } from '$com/shell'
  import { dict } from '$lib/intl'
  import { Spinner } from '$ui/spinner'
  import { Grammar } from '@/accounts/ui'
  import { Cosmetics } from '@/accounts/ui'
  import { Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Balance, Share, Groups, Expenses } from '@/contacts/ui'
  import { Delete } from '@/contacts/ui'
  import { expenses } from '@/expenses'
  import { Transfer } from '@/expenses/ui'
  import { groups } from '@/groups'
  import { account } from '@/iam'

  const id = $derived(page.params.id) as string

  function ondelete() {
    void goto('..')
  }
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
    <Header.Actions>
      <Async store={contacts}>
        {#snippet awaited(contacts)}
          {@const contact = contacts.find((contact) => contact.id === id)}
          {#if contact}
            <Delete {contact} {ondelete} />
          {/if}
        {/snippet}
      </Async>
    </Header.Actions>
  </Header.Root>
</Section>

<Async store={combined(contacts, groups, expenses)}>
  {#snippet awaited([contacts, groups, expenses])}
    {@const contact = contacts.find((contact) => contact.id === id)}
    {#if contact?.account && ok(contact.account)}
      <Section>
        <div class="flex flex-col gap-4">
          <Cosmetics account={contact.account} editable={contact.managed} managed />
          {#if contact.managed}
            <Grammar account={contact.account} managed class="items-center" />
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
        <Expenses {contact} {expenses} />
      </Section>

      <Actions>
        {#if contact.balance !== 0}
          <Async store={account}>
            {#snippet awaited(account)}
              <Transfer {account} {contact} />
            {/snippet}
          </Async>
        {/if}
      </Actions>
    {:else}
      <Spinner class="m-auto" />
    {/if}
  {/snippet}
</Async>
