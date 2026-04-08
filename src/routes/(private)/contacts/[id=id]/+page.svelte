<script lang="ts">
  import { Async, combined, ok } from 'svas'
  import { seen } from '@/notifications'
  import { account } from '@/iam'
  import { groups } from '@/groups'
  import { Toggle as Favorite } from '@/favorites/ui'
  import { Transfer } from '@/expenses/ui'
  import { expenses } from '@/expenses'
  import { Balance, Share, Groups, Expenses } from '@/contacts/ui'
  import { Delete } from '@/contacts/ui'
  import { contacts } from '@/contacts'
  import { BackgroundOverride, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { Grammar } from '@/accounts/ui'
  import { Cosmetics } from '@/accounts/ui'
  import { Spinner } from '$ui/spinner'
  import { dict } from '$lib/intl'
  import { Actions } from '$com/shell'
  import { Separator } from '$com/separator'
  import { page } from '$app/state'
  import { goto } from '$app/navigation'

  const id = $derived(page.params.id) as string

  function ondelete() {
    void goto('..')
  }

  $effect(() => {
    void seen('contacts', id)
  })
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    {@const contact = contacts.find((c) => c.identity === id)}

    <Section>
      <Header.Root>
        <Header.Title>{$dict.contacts.title}</Header.Title>
        {#if contact}
          <Header.Actions>
            <Favorite id={contact.identity} type="contact" />
            <Delete {contact} {ondelete} />
          </Header.Actions>
        {/if}
      </Header.Root>
    </Section>

    <Async store={combined(groups, expenses)}>
      {#snippet awaited([groups, expenses])}
        {#if contact?.account && ok(contact.account)}
          {#if contact.account.wallpaper?.pattern ?? contact.account.background}
            <BackgroundOverride account={contact.account} />
          {/if}
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
            <Async store={account}>
              {#snippet awaited(account)}
                <Transfer {account} {contact} />
              {/snippet}
            </Async>
          </Actions>
        {:else}
          <Spinner class="m-auto" />
        {/if}
      {/snippet}
    </Async>
  {/snippet}
</Async>
