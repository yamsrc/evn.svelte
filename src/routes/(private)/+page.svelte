<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Header, Section } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Totals, Tops } from '@/contacts/ui'
  import { expenses } from '@/expenses'
  import { Recent } from '@/expenses/ui'
  import { account } from '@/iam'
</script>

<Async store={combined(account, contacts, expenses)}>
  {#snippet awaited([account, contacts, expenses])}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.home.title(account.name)}</Header.Title>
      </Header.Root>
    </Section>

    <Section>
      <Totals {contacts} />
    </Section>

    <Section>
      <Tops {contacts} />
    </Section>

    <Section>
      <Recent {expenses} />
    </Section>
  {/snippet}
</Async>
