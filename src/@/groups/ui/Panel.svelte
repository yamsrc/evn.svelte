<script lang="ts">
  import { Users } from '@lucide/svelte'
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/contacts/ui'
  import { account } from '@/iam'
  import type { Props } from './Panel'

  let { group, selected = $bindable(), onselect }: Props = $props()

  const members = $derived(group.identities.filter((identity) => identity !== $account?.id))

  function onclick(event: MouseEvent) {
    if (onselect) {
      event.preventDefault()
      selected = !selected
      onselect(group.id, selected)
    } else goto(`/contacts/groups/${group.id}`)
  }
</script>

<Panel {selected} class={cn('bg-card border border-border h-20')} {onclick}>
  {#snippet left()}
    <div class="flex flex-col items-start gap-1">
      <div class="flex items-center gap-2">
        <Users class="size-4" />
        <span class="font-bold">{group.name}</span>
      </div>
      <div class="flex flex-nowrap gap-1 items-center">
        {#each members.slice(0, 5) as identity (identity)}
          <Async store={accounts.get(identity)} class="not-first:-ml-3 shrink-0">
            {#snippet awaited(account)}
              <Picture {account} class="size-8" />
            {/snippet}
          </Async>
        {/each}
        {#if members.length > 5}
          <div class="ml-2">
            +{members.length - 5}
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
  {#snippet right()}
    <Balance balance={group.balance} />
  {/snippet}
</Panel>
