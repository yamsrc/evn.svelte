<script lang="ts">
  import { Async, combined } from 'svas'
  import { Permission } from '@/transmission/ui'
  import { subscribed } from '@/transmission'
  import { Notifications } from '@/notifications/ui'
  import { notifications, scope } from '@/notifications'
  import { account } from '@/iam'
  import { Recent } from '@/expenses/ui'
  import { expenses } from '@/expenses'
  import { Totals, Tops } from '@/contacts/ui'
  import { contacts } from '@/contacts'
  import { Header, Section } from '@/app/ui'
  import { Actions } from '@/app/ui'
  import { Avatar } from '@/accounts/ui'
  import { dict } from '$lib/intl'

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

    <Section class="px-0 flex flex-col gap-2">
      {#if $subscribed === false}
        <div class="px-5">
          <Permission dismissable />
        </div>
      {/if}
      {#if notifications.length > 0}
        <Notifications {notifications} />
      {/if}
    </Section>

    <Section>
      <Tops {contacts} />
    </Section>

    <Section>
      <Recent {expenses} notifications={expensesNotifications} />
    </Section>
  {/snippet}
</Async>

<Actions />
