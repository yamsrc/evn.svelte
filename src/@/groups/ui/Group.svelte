<script lang="ts">
  import { Users } from '@lucide/svelte'
  import { Async } from 'svas'
  import { goto } from '$app/navigation'
  import { Panel } from '$com/panel'
  import { cn } from '$lib/utils'
  import { accounts } from '@/account'
  import { Picture } from '@/account/ui'
  import { Balance } from '@/app/ui'
  import { account } from '@/iam'
  import type { Props } from './Group'

  const { group, selectable = false, onselect }: Props = $props()

  const members = $derived(group.identities.filter((identity) => identity !== $account?.id))

  let selected = $state(false)

  function onclick(event: MouseEvent) {
    if (selectable && onselect) {
      event.preventDefault()
      selected = !selected
      onselect(group, selected)
    } else goto(`/contacts/groups/${group.id}`)
  }
</script>

<Panel
  class={cn('bg-card border border-border h-20', { 'bg-accent': selectable && selected })}
  {onclick}
>
  {#snippet left()}
    <div class="flex flex-col items-start gap-1">
      <div class="flex items-center gap-2">
        <Users class="size-4" />
        <span class="font-bold text-base">{group.name}</span>
      </div>
      <div class="flex flex-nowrap gap-1 items-center">
        {#each members.slice(0, 5) as identity (identity)}
          <Async store={accounts.get(identity)} class="not-first:-ml-3">
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
