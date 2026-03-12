<script lang="ts">
  import { Async } from 'svas'
  import { Users } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Picture } from '@/accounts/ui'
  import { accounts } from '@/accounts'
  import { TextEllipsis } from '$com/text-ellipsis'
  import { Panel } from '$com/panel'
  import type { Props } from './Group'

  const MAX_DISPLAYED_MEMBERS = 3

  let { group, selected = $bindable(), onselect, class: classes }: Props = $props()

  const members = $derived(group.identities.filter((id) => id !== $account?.id))

  function onclick(event: MouseEvent) {
    if (selected === undefined || onselect === undefined) return

    event.preventDefault()
    selected = !selected
    onselect(group.id, selected)
  }
</script>

<Panel
  class={['bg-card border border-border w-max flex-col gap-0', classes]}
  href={`/contacts/groups/${group.id}/`}
  {selected}
  {onclick}>
  {#snippet left()}
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-center justify-center gap-1 max-w-30">
        {#if group.emoji}
          <span class="font-bold shrink-0">{group.emoji}</span>
        {:else}
          <Users class="size-4 shrink-0" />
        {/if}
        <TextEllipsis class="font-bold">{group.title ?? group.name}</TextEllipsis>
      </div>
      <div class="flex items-center min-h-8">
        {#if members.length}
          <div class="flex -space-x-2">
            {#each members.slice(0, MAX_DISPLAYED_MEMBERS) as identity (identity)}
              <Async store={accounts.get(identity)}>
                {#snippet awaited(account)}
                  <Picture {account} class="size-8 ring-2 ring-card" />
                {/snippet}
              </Async>
            {/each}
          </div>
          {#if members.length > MAX_DISPLAYED_MEMBERS}
            <span class="ms-2">
              +{members.length - MAX_DISPLAYED_MEMBERS}
            </span>
          {/if}
        {/if}
      </div>
    </div>
  {/snippet}
</Panel>
