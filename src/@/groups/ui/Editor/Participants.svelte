<script lang="ts">
  import { Async, ok } from 'svas'
  import { dict } from '$lib/intl'
  import { accounts } from '@/accounts'
  import { Panel } from '@/accounts/ui'
  import { contacts } from '@/contacts'
  import { account } from '@/iam'
  import type { Props } from './Participants'

  const { identities, class: classes }: Props = $props()

  const others = $derived(identities.filter((id) => id !== $account?.id))
</script>

<Async store={contacts}>
  {#snippet awaited(contacts)}
    <div class={['space-y-2', classes]}>
      <h2>{$dict.groups.members.title}</h2>
      {#if others.length === 0}
        <p class="text-sm text-muted-foreground">{$dict.groups.members.empty}</p>
      {:else}
        {#each others as id (id)}
          {@const contact = contacts.find((c) => c.identity === id)}
          {#if contact?.account && ok(contact.account)}
            <Panel account={contact.account} balance={contact.balance} href={`/contacts/${id}/`} />
          {:else}
            <Async store={accounts.get(id)}>
              {#snippet awaited(account)}
                <Panel {account} />
              {/snippet}
            </Async>
          {/if}
        {/each}
      {/if}
    </div>
  {/snippet}
</Async>
