<script lang="ts">
  import { Async, combined } from 'svas'
  import { Permission } from '@/transmission/ui'
  import { promptable } from '@/transmission'
  import { receipts } from '@/receipts'
  import { Notifications } from '@/notifications/ui'
  import { notifications, scope } from '@/notifications'
  import { account } from '@/iam'
  import { Cards as Groups } from '@/groups/ui'
  import { groups } from '@/groups'
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

<Async store={combined(account, contacts, expenses, receipts, groups, notifications)}>
  {#snippet awaited([account, contacts, expenses, receipts, groups, notifications])}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.home.title(account.name)}</Header.Title>
        <Header.Actions>
          <Header.Button href="/me/" id="header-me-button" variant="ghost">
            <Avatar
              {account}
              style="view-transition-name: my-avatar; view-transition-class: transition-morph;" />
          </Header.Button>
        </Header.Actions>
      </Header.Root>
    </Section>

    <Section>
      <Totals {contacts} />
    </Section>

    {#if $promptable || notifications.length > 0}
      <Section class="px-0 flex flex-col gap-2">
        {#if $promptable}
          <div class="px-5">
            <Permission dismissable />
          </div>
        {/if}
        {#if notifications.length > 0}
          <Notifications {notifications} />
        {/if}
      </Section>
    {/if}

    <Section>
      <Tops {contacts} />
    </Section>

    {#if groups.length > 0}
      <Section class="space-y-2">
        <h2>{$dict.groups.title}</h2>
        <Groups {groups} extended />
      </Section>
    {/if}

    <Section>
      <Recent {expenses} {receipts} notifications={expensesNotifications} />
    </Section>
  {/snippet}
</Async>

<Actions />
