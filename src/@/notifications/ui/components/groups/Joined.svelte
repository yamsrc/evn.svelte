<script lang="ts">
  import { Async, combined } from 'svas'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { dict } from '@/notifications/ui/intl'
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
      <Button
        href={`/contacts/groups/${group.id}`}
        class="w-full p-4 items-start h-fit font-normal"
        variant="ghost">
        <span class="text-start w-full text-pretty whitespace-normal">
          {#if me}
            {$dict.groups.joined.me(group.name)}
          {:else}
            {@const names = newbies.map((account) => (account as Account).name)}
            {$dict.groups.joined.others(names, group.name)}
          {/if}
        </span>
      </Button>
    {/if}
  {/snippet}
</Async>
