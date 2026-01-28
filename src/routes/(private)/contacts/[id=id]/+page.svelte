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
  import { BackgroundOverride, Section } from '@/app/ui'
  import { Header } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Balance, Share, Groups, Expenses, Favorite } from '@/contacts/ui'
  import { Delete } from '@/contacts/ui'
  import { expenses } from '@/expenses'
  import { Transfer } from '@/expenses/ui'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { notifications } from '@/notifications'
  import { seen } from '@/notifications'

  const id = $derived(page.params.id) as string

  const contact = $derived(
    ok($contacts) ? $contacts.find((contact) => contact.id === id) : undefined,
  )

  function ondelete() {
    void goto('..')
  }

  $effect(() => {
    if (contact?.identity) void seen('contacts', contact?.identity)

    if (contact?.account) void seen('accounts', contact.identity)
  })
</script>

<Section>
  <Header.Root>
    <Header.Title>{$dict.contacts.title}</Header.Title>
    <Header.Actions>
      {#if contact}
        <Delete {contact} {ondelete} />
      {/if}
    </Header.Actions>
  </Header.Root>
</Section>

<Async store={combined(groups, expenses, notifications)}>
  {#snippet awaited([groups, expenses, notifications])}
    {@const expensesNotifications = notifications.filter((n) => n.domain === 'expenses')}
    {#if contact?.account && ok(contact.account)}
      {#if contact.account.background}
        <BackgroundOverride id={contact.account.background} />
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
        <Expenses {contact} {expenses} notifications={expensesNotifications} />
      </Section>

      <Actions>
        {#if contact.balance !== 0}
          <Async store={account}>
            {#snippet awaited(account)}
              <Transfer {account} {contact} />
            {/snippet}
          </Async>
        {/if}
        <Favorite {contact} />
      </Actions>
    {:else}
      <Spinner class="m-auto" />
    {/if}
  {/snippet}
</Async>
