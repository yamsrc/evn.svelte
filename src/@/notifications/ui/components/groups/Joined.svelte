<script lang="ts">
  import { Async, combined, ensure } from 'svas'
  import { Button } from '$ui/button'
  import { accounts } from '@/accounts'
  import { groups } from '@/groups'
  import { account } from '@/iam'
  import { dict } from '@/notifications/ui/intl'
  import type { Props } from './Joined'
  import type { Account } from '@/accounts'

  const { notification }: Props = $props()

  const newbies: Account[] = $derived.by(() => {
    const identities = notification.payload.identities
    const newbies: Account[] = []

    for (const identity of identities) {
      const account = ensure(accounts.get(identity))

      if (account) newbies.push(account)
    }

    if (newbies.length < identities.length) return []

    return newbies
  })
</script>

{#if newbies.length > 0}
  <Async store={combined(groups, account)}>
    {#snippet awaited([groups, account])}
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
              {newbies.map((account) => account.name).join(', ')}
              {$dict.groups.joined.others(group.name)}
            {/if}
          </span>
        </Button>
      {/if}
    {/snippet}
  </Async>
{/if}
