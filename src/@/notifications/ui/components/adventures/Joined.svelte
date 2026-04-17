<script lang="ts">
  import { Async, combined } from 'svas'
  import { dict } from '@/notifications/ui/intl'
  import { account } from '@/iam'
  import { adventures } from '@/adventures'
  import { Avatar, Title } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import Base from '../Base.svelte'
  import type { Adventure } from '@/adventures'
  import type { Account } from '@/accounts'
  import type { Props } from './Joined'

  const { notification }: Props = $props()

  const newbies = $derived(
    notification.payload.identities.map((identity) => accounts.get(identity)),
  )
</script>

<Async store={combined(adventures, account, ...newbies)}>
  {#snippet awaited([adventures, account, ...newbies]: [Adventure[], Account, ...Account[]])}
    {@const adventure = adventures.find((a) => a.id === notification.key)}
    {@const title = adventure?.title ?? notification.payload.title}
    {@const me = newbies.find(({ id }) => id === account.id)}
    <Base href={`/adventures/${notification.key}/`}>
      <div class="flex items-center gap-2">
        {#if me}
          {$dict.adventures.joined.me(title, me.grammar)}
        {:else if newbies.length === 1}
          {@const newbie = newbies[0]}
          {@const name = $dict.adventures.joined.other(newbie.name, title, newbie.grammar)}
          <Avatar account={newbie} size={32} />
          <Title account={{ ...newbie, name }} />
        {:else}
          {@const names = newbies.map((account) => account.name)}
          {$dict.adventures.joined.others(names, title, undefined)}
        {/if}
      </div>
    </Base>
  {/snippet}
</Async>
