<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '$lib/intl'
  import { Header, Section } from '@/app/ui'
  import { contacts } from '@/contacts'
  import { Totals } from '@/contacts/ui'
  import { account } from '@/iam'
</script>

<Async store={combined(account, contacts)}>
  {#snippet awaited([account, contacts])}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.home.title(account.name)}</Header.Title>
      </Header.Root>
      <Totals {contacts} />
    </Section>
  {/snippet}
</Async>
