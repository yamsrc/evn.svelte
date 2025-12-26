<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Group from './Group.svelte'
  import type { Props } from './Groups'

  let { groups, title, selection = $bindable() }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

<Section class="flex flex-col gap-1.5">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each groups as group (group.id)}
    {@const selected = selection?.has(group.id)}
    {@const selectedProps = selectable ? { selected, onselect } : undefined}
    <Group {group} {...selectedProps} />
  {/each}
</Section>
