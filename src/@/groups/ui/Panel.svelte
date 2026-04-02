<script lang="ts">
  import { Users } from '@lucide/svelte'
  import { Panel } from '$com/panel'
  import { Attention } from '$com/shell'
  import { Avatars, Balance } from '@/app/ui'
  import type { Props } from './Panel'

  let { group, selected = $bindable(), highlighted, onselect }: Props = $props()

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
        {#if group.emoji}
          <span class="font-bold">{group.emoji}</span>
        {:else}
          <Users class="size-4" />
        {/if}
        <span class="font-bold">{group.title ?? group.name}</span>
      </div>
      <Avatars identities={group.identities} max={5} class="py-1" />
    </div>
  {/snippet}
  {#snippet right()}
    {#if group.balance}
      <Balance balance={group.balance} />
    {/if}
    {#if highlighted}
      <Attention class="absolute top-2 right-2 z-10" />
    {/if}
  {/snippet}
</Panel>
