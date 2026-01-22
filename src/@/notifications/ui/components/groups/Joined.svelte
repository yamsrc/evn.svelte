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
      {@const identity = notification.payload.identities[0]}
      <div class="flex items-center gap-2">
        {#if identity}
          <Async store={accounts.get(identity)}>
            {#snippet awaited(account)}
              <Picture {account} class="size-8 shrink-0" />
              <div class="text-sm">
                <span class="font-medium">{account.name}</span>
                <span class="ml-1">joined</span>
                <span class="font-medium ml-1">{group.name}</span>
              </div>
            {/snippet}
          </Async>
        {:else}
          <div class="text-sm">
            <span>Someone joined</span>
            <span class="font-medium ml-1">{group.name}</span>
          </div>
        {/if}
      </div>
    {/if}
  {/snippet}
</Async>
