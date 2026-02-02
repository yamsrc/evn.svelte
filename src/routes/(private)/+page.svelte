<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Avatar } from '@/accounts/ui'
  import { Header, Section } from '@/app/ui'
  import { Actions } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Totals, Tops } from '@/contacts/ui'
  import { expenses } from '@/expenses'
  import { Recent } from '@/expenses/ui'
  import { account } from '@/iam'
  import { notifications, scope } from '@/notifications'
  import { Notifications, Nudge } from '@/notifications/ui'
  import { subscribed } from '@/transmission'

  const expensesOnlyNotifications = scope({ domain: 'expenses' })
  const transfersNotifications = scope({ domain: 'contacts', event: 'transferred' })
  const expensesNotifications = $derived([
    ...$expensesOnlyNotifications,
    ...$transfersNotifications,
  ])
</script>

<Async store={combined(account, contacts, expenses, notifications)}>
  {#snippet awaited([account, contacts, expenses, notifications])}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.home.title(account.name)}</Header.Title>
        <Header.Actions>
          <Header.Button href="/me/" id="header-me-button" variant="ghost">
            <Avatar {account} style="view-transition-name: my-avatar;" />
          </Header.Button>
        </Header.Actions>
      </Header.Root>
    </Section>

    <Section>
      <Totals {contacts} />
    </Section>

    {#if $subscribed === false}
      <Section class="px-0 flex flex-col gap-2">
        {#if notifications.length > 0}
          <Notifications {notifications} />
          <div class="px-5">
            <Nudge />
          </div>
        {/if}
      </Section>
    {/if}

    <Section>
      <Tops {contacts} />
    </Section>

    <Section>
      <Recent {expenses} notifications={expensesNotifications} />
    </Section>
  {/snippet}
</Async>

<Actions />
