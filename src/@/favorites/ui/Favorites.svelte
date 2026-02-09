<script lang="ts">
  import { Section } from '@/app/ui'
  import Panel from './Panel.svelte'
  import type { Props } from './Favorites'

  const { favorites, title, selection = $bindable() }: Props = $props()

  const selectable = $derived(selection !== undefined)

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

{#if favorites.length}
  <Section class="overflow-visible flex flex-col gap-1.5" id="favorites-list">
    {#if title}
      <h2>{title}</h2>
    {/if}
    <div class="overflow-x-auto -mx-5 py-2 -my-2 no-scrollbar">
      <div id="favorites-list-content" class="w-fit flex gap-1.5 mx-5">
        {#each favorites as favorite (favorite.id)}
          {@const selected = selection?.has(favorite.favorite)}
          {@const selectedProps = selectable ? { selected, onselect } : undefined}
          <Panel {favorite} {...selectedProps} />
        {/each}
      </div>
    </div>
  </Section>
{/if}
