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
  import { notifications } from '@/notifications'
  import { Notifications } from '@/notifications/ui'
</script>

<Async store={combined(account, contacts, expenses, notifications)}>
  {#snippet awaited([account, contacts, expenses, notifications])}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.home.title(account.name)}</Header.Title>
        <Header.Actions>
          <Header.Button href="/me/" id="header-me-button">
            <Avatar size={32} />
          </Header.Button>
        </Header.Actions>
      </Header.Root>
    </Section>

    <Section>
      <Totals {contacts} />
    </Section>

    <Section class="px-0">
      <Notifications {notifications} />
    </Section>

    <Section>
      <Tops {contacts} />
    </Section>

    <Section>
      <Recent {expenses} />
    </Section>
  {/snippet}
</Async>

<Actions />
