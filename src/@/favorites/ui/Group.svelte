<script lang="ts">
  import { Users } from '@lucide/svelte'
  import { account } from '@/iam'
  import { Avatars } from '@/app/ui'
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
      <Avatars identities={members} max={MAX_DISPLAYED_MEMBERS} />
    </div>
  {/snippet}
</Panel>
