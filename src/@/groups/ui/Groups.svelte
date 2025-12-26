<script lang="ts">
  import Section from '$com/section/Section.svelte'
  import Group from './Group.svelte'
  import type { GroupWithBalance } from './Group'
  import type { Props } from './Groups'

  let { groups, title, selectable, selection = $bindable([]) }: Props = $props()

  function select(group: GroupWithBalance, selected: boolean) {
    if (selected) selection.push(group)
    else selection = selection.filter((g) => g.id !== group.id)
  }
</script>

<Section class="flex flex-col gap-1">
  {#if title}
    <h2>{title}</h2>
  {/if}
  {#each groups as group (group.id)}
    <Group {group} {selectable} onselect={select} />
  {/each}
</Section>
