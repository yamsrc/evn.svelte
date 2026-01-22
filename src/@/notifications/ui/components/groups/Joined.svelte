<script lang="ts">
  import { Async } from 'svas'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { groups } from '@/groups'
  import type { Props } from './Joined'

  const { notification }: Props = $props()
</script>

<Async store={groups}>
  {#snippet awaited(groups)}
    {@const group = groups.find((g) => g.id === notification.key)}
    {#if group}
      {@const inviterIdentity = notification.payload?.identities?.[0]}
      <div class="flex items-center gap-3">
        {#if inviterIdentity}
          <Async store={accounts.get(inviterIdentity)}>
            {#snippet awaited(inviterAccount)}
              <Picture account={inviterAccount} class="size-8 shrink-0" />
              <div class="text-sm">
                <span class="font-medium">{inviterAccount.name}</span>
                <span class="ml-1">added you to</span>
                <span class="font-medium ml-1">{group.name}</span>
              </div>
            {/snippet}
          </Async>
        {:else}
          <div class="text-sm">
            <span>You've been added to</span>
            <span class="font-medium ml-1">{group.name}</span>
          </div>
        {/if}
      </div>
    {/if}
  {/snippet}
</Async>
