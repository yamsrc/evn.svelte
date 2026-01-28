<script lang="ts">
  import { Users } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Panel } from '$com/panel'
  import { Attention } from '$com/shell'
  import { dict } from '$lib/intl'
  import { accounts } from '@/accounts'
  import { Picture } from '@/accounts/ui'
  import { Balance } from '@/app/ui'
  import { account } from '@/iam'
  import type { Props } from './Panel'

  let { group, selected = $bindable(), highlighted, onselect }: Props = $props()

  const members = $derived(group.identities.filter((identity) => identity !== $account?.id))

  function onclick(event: MouseEvent) {
    if (onselect) {
      event.preventDefault()
      selected = !selected
      onselect(group.id, selected)
    }
  }
</script>

<Panel
  {selected}
  class="bg-card border border-border"
  {onclick}
  href={`/contacts/groups/${group.id}`}>
  {#snippet left()}
    <div class="flex flex-col items-start gap-1">
      <div class="flex items-center gap-2">
        <Users class="size-4" />
        <span class="font-bold">{group.name}</span>
      </div>
      <div class="flex flex-nowrap gap-1 items-center py-1">
        {#each members.slice(0, 5) as identity (identity)}
          <Async store={accounts.get(identity)}>
            {#snippet awaited(account)}
              <div class="not-first:-ml-3 shrink-0">
                <Picture {account} class="size-8" />
              </div>
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
    {#if group.balance}
      <Balance balance={group.balance} youAreOwed={$dict.contacts.contact.owesYou} />
    {/if}
    {#if highlighted}
      <Attention class="absolute top-2 right-2 z-10" />
    {/if}
  {/snippet}
</Panel>
