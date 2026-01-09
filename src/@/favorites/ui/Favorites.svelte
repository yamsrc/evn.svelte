<script lang="ts">
  import { Star } from '@lucide/svelte'
  import { cn } from '$lib/utils'
  import { buttonVariants } from '$ui/button'
  import { Section } from '@/app/ui'
  import Panel from './Panel.svelte'
  import type { Props } from './Favorites'

  const { favorites, title, selection = $bindable() }: Props = $props()

  const selectable = $derived(!!selection)

  function onselect(id: string, selected: boolean) {
    if (!selection) return

    if (selected) selection.add(id)
    else selection.delete(id)
  }
</script>

<Section class="overflow-visible flex flex-col gap-1.5" id="favorites-list">
  {#if title}
    <div class="flex items-center gap-2">
      <div
        class={cn(buttonVariants({ variant: 'secondary', size: 'icon' }), 'rounded-full size-6')}
      >
        <Star size={16} />
      </div>
      <h2>{title}</h2>
    </div>
  {/if}
  <div class="overflow-x-auto -mx-5 px-5 py-2 -my-2 no-scrollbar">
    <div id="favorites-list-content" class="w-fit flex gap-1.5">
      {#each favorites as favorite (favorite.id)}
        {@const selected = selection?.has(favorite.favorite)}
        {@const selectedProps = selectable ? { selected, onselect } : undefined}
        <Panel {favorite} {...selectedProps} />
      {/each}
    </div>
  </div>
</Section>
