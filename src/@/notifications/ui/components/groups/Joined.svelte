<script lang="ts">
  import { Async, combined } from 'svas'
  import { accounts } from '@/accounts'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { dict } from '@/notifications/ui/intl'
  import Base from '../Base.svelte'
  import type { Props } from './Joined'
  import type { Account } from '@/accounts'

  const { notification }: Props = $props()

  const newbies = $derived(
    notification.payload.identities.map((identity) => accounts.get(identity)),
  )
</script>

<Async store={combined(groups, account, ...newbies)}>
  {#snippet awaited([groups, account, ...newbies])}
    {@const group = groups.find((g) => g.id === notification.key)}
    {#if group}
      {@const me = newbies.find(({ id }) => id === account.id)}
      <Base href={`/contacts/groups/${group.id}`}>
        {#if me}
          {$dict.groups.joined.me(group.name)}
        {:else}
          {@const names = newbies.map((account) => (account as Account).name)}
          {$dict.groups.joined.others(names, group.name)}
        {/if}
      </Base>
    {/if}
  {/snippet}
</Async>
