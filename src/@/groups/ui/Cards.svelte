<script lang="ts">
  import { groups } from '@/groups'
  import { List } from '@/app/ui'
  import { goto } from '$app/navigation'
  import Card from './Card.svelte'
  import type { Props } from './Cards'

  const { class: classes }: Props = $props()

  function onpick(index: number) {
    void goto(`/contacts/groups/${$groups[index].id}`)
  }
</script>

{#if $groups.length > 0}
  <List.Root {onpick} align="start" class={['py-1 -my-1', classes]}>
    {#each $groups as group, index (group.id)}
      <List.Option variant="outline" {index} class="overflow-hidden">
        <Card {group} />
      </List.Option>
    {/each}
  </List.Root>
{/if}
