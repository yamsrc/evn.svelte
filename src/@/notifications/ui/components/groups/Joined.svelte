<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '@/notifications/ui/intl'
  import { account } from '@/iam'
  import { groups, type Group } from '@/groups'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import Base from '../Base.svelte'
  import type { Account } from '@/accounts'
  import type { Props } from './Joined'

  const { notification }: Props = $props()

  const newbies = $derived(
    notification.payload.identities.map((identity) => accounts.get(identity)),
  )
</script>

<Async store={combined(groups, account, ...newbies)}>
  {#snippet awaited([groups, account, ...newbies]: [Group[], Account, ...Account[]])}
    {@const group = groups.find((g) => g.id === notification.key)}
    {#if group}
      {@const me = newbies.find(({ id }) => id === account.id)}
      <Base href={`/contacts/groups/${group.id}`}>
        <div class="flex items-center gap-2">
          {#if me}
            {$dict.groups.joined.me(group.name)}
          {:else if newbies.length === 1}
            {@const newbie = newbies[0]}
            <Picture account={newbie} size={32} />
            {$dict.groups.joined.other(newbie.name, group.name, newbie.grammar)}
          {:else}
            {@const names = newbies.map((account) => account.name)}
            {$dict.groups.joined.others(names, group.name)}
          {/if}
        </div>
      </Base>
    {/if}
  {/snippet}
</Async>
