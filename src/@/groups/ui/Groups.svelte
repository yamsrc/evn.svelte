<script lang="ts">
  import { Section } from '@/app/ui'
  import Group from './Panel.svelte'
  import type { Props } from './Groups'

  let { groups, notifications, title, selection = $bindable() }: Props = $props()

  const selectable = $derived(selection !== undefined)

  const unseen = (id: string) => notifications?.some((n) => n.key === id) ?? false

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

{#if groups.length}
  <Section>
    <div class="flex flex-col gap-1.5">
      {#if title}
        <h2>{title}</h2>
      {/if}
      <div class="flex flex-col gap-1.5">
        {#each groups as group (group.id)}
          {@const selected = selection?.has(group.id)}
          {@const highlighted = unseen(group.id)}
          {#if selectable}
            <Group {group} {selected} {highlighted} {onselect} />
          {:else}
            <Group {group} {highlighted} />
          {/if}
        {/each}
      </div>
    </div>
  </Section>
{/if}
