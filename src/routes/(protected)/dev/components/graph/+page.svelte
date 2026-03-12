<script lang="ts">
  import { Async, combined } from 'svas'
  import { account } from '@/iam'
  import { Graph } from '@/groups/ui'
  import { groups } from '@/groups'
  import { contacts } from '@/contacts'
  import { Section, Header } from '@/app/ui'
  import { dict } from '$lib/intl/dev'
</script>

<Async store={combined(account, contacts, groups)}>
  {#snippet awaited([account, contacts, groups])}
    {@const group = groups.find((g) => g.identities.length > 1)}
    <Section>
      <Header.Root>
        <Header.Title>{$dict.components.graph.title}{group ? `: ${group.name}` : ''}</Header.Title>
      </Header.Root>
    </Section>

    <Section>
      {#if group}
        <Graph {group} {account} {contacts} />
      {:else}
        <p class="text-muted-foreground text-sm">No group found.</p>
      {/if}
    </Section>
  {/snippet}
</Async>
