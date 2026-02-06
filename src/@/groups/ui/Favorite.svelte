<script lang="ts">
  import { Star } from '@lucide/svelte'
  import { Async } from 'svas'
  import { Action } from '@/app/ui'
  import { favorites, add, del } from '@/favorites'
  import type { Props } from './Favorite'
  import type { Favorite } from '@/favorites'

  const { group }: Props = $props()

  let busy = $state(false)

  async function toggle(favorite: Favorite | undefined) {
    if (busy) return

    busy = true

    if (favorite) await del(favorite.id)
    else await add(group.id)

    busy = false
  }
</script>

<Async store={favorites}>
  {#snippet awaited(favorites)}
    {@const favorite = favorites.find((f) => f.favorite === group.id)}
    <Action
      id="groups-favorite-button"
      variant={favorite ? 'default' : 'secondary'}
      onclick={() => toggle(favorite)}
      class={[busy && 'opacity-75']}>
      <Star fill={favorite ? 'currentColor' : 'none'} />
    </Action>
  {/snippet}
</Async>
